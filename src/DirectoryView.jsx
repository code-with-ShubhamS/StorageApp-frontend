import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DirectoryHeader from "./components/DirectoryHeader";
import CreateDirectoryModal from "./components/CreateDirectoryModal";
import RenameModal from "./components/RenameModal";
import DirectoryList from "./components/DirectoryList";
import { DirectoryContext } from "./context/DirectoryContext";
import {
  getDirectoryItems,
  createDirectory,
  deleteDirectory,
  renameDirectory,
} from "./api/directoryApi";

import { deleteFile, renameFile } from "./api/fileApi";
import DetailsPopup from "./components/DetailsPopup";
import ConfirmDeleteModal from "./components/ConfirmDeleteModel";
import { fileTypeFromBuffer } from "file-type";
function DirectoryView() {
  const { dirId } = useParams();
  const navigate = useNavigate();

  const [directoryName, setDirectoryName] = useState("My Drive");
  const [directoriesList, setDirectoriesList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreateDirModal, setShowCreateDirModal] = useState(false);
  const [newDirname, setNewDirname] = useState("New Folder");
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameType, setRenameType] = useState(null);
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const fileInputRef = useRef(null);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [uploadXhrMap, setUploadXhrMap] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [activeContextMenu, setActiveContextMenu] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [currentFileUploadId,setCurrentFileUploadId] = useState(null);
  const [uploadItem, setUploadItem] = useState(null);
  const xhrRef = useRef(null);

  const maxFileSize = 100 * 1024 * 1024; // 100 MB
  const openDetailsPopup = (item) => {
    console.log(item);
    setDetailsItem(item);
  };
  const closeDetailsPopup = () => setDetailsItem(null);

  const loadDirectory = async () => {
    try {
      const data = await getDirectoryItems(dirId);
      setDirectoryName(dirId ? data.name : "My Drive");
      setDirectoriesList([...data.directories].reverse());
      setFilesList([...data.files].reverse());
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else setErrorMessage(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    loadDirectory();
    setActiveContextMenu(null);
  }, [dirId]);

  function getFileIcon(filename) {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "pdf";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "image";
      case "mp4":
      case "mov":
      case "avi":
        return "video";
      case "zip":
      case "rar":
      case "tar":
      case "gz":
        return "archive";
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "html":
      case "css":
      case "py":
      case "java":
        return "code";
      default:
        return "alt";
    }
  }

  function handleRowClick(type, id) {
    if (type === "directory") navigate(`/directory/${id}`);
    else
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/file/${id}`;
  }
  //  Uploading Mutiple files with Queue Management
  // function handleFileSelect(e) {
  //   const selectedFiles = Array.from(e.target.files);
  //   if (!selectedFiles.length) return;

  // const oversizedFile = selectedFiles.find((file) => file.size > maxFileSize);

  // // ❌ If any file is too large, show error and cancel all
  // if (oversizedFile) {
  //   alert(
  //     `File "${oversizedFile.name}" exceeds the 100MB limit. Please select smaller files.`
  //   );
  //   e.target.value = ""; // Reset input
  //   return;
  // }

  //   const newItems = selectedFiles.map((file) => ({
  //     file,
  //     name: file.name,
  //     id: `temp-${Date.now()}-${Math.random()}`,
  //     isUploading: false,
  //   }));

  //   setFilesList((prev) => [...newItems, ...prev]);
  //   newItems.forEach((item) => {
  //     setProgressMap((prev) => ({ ...prev, [item.id]: 0 }));
  //   });
  //   setUploadQueue((prev) => [...prev, ...newItems]);
  //   e.target.value = "";

  //   if (!isUploading) {
  //     setIsUploading(true);
  //     processUploadQueue([...uploadQueue, ...newItems.reverse()]);
  //   }
  // }

  // function processUploadQueue(queue) {
  //   if (!queue.length) {
  //     setIsUploading(false);
  //     setUploadQueue([]);

  //     setTimeout(() => loadDirectory(), 1000);
  //     return;
  //   }

  //   const [currentItem, ...restQueue] = queue;
  //   // const maxFileSize = 100 * 1024 * 1024; // 100 MB
  //   if (currentItem.file.size > maxFileSize) {
  //     setIsUploading(false);
  //     setUploadQueue([]);
  //      setProgressMap({})
  //     alert(`Error: "${currentItem.name}" exceeds the 100MB size limit.`);
  //     return;
  //   }

  //   setFilesList((prev) =>
  //     prev.map((f) =>
  //       f.id === currentItem.id ? { ...f, isUploading: true } : f
  //     )
  //   );

  //   // return;
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", `http://localhost:4000/file/${dirId || ""}`);
  //   xhr.withCredentials = true;
  //   xhr.setRequestHeader("filename", currentItem.name);
  //   xhr.setRequestHeader("filesize", currentItem.file.size);

  //   xhr.upload.addEventListener("progress", (evt) => {
  //     if (evt.lengthComputable) {
  //       const progress = (evt.loaded / evt.total) * 100;
  //       setProgressMap((prev) => ({ ...prev, [currentItem.id]: progress }));
  //     }
  //   });

  //   xhr.onload = () => processUploadQueue(restQueue);
  //   xhr.onerror = () => processUploadQueue(restQueue);

  //   setUploadXhrMap((prev) => ({ ...prev, [currentItem.id]: xhr }));
  //   xhr.send(currentItem.file);
  // }

  // function handleCancelUpload(tempId) {
  //   const xhr = uploadXhrMap[tempId];
  //   if (xhr) xhr.abort();
  //   setUploadQueue((prev) => prev.filter((item) => item.id !== tempId));
  //   setFilesList((prev) => prev.filter((f) => f.id !== tempId));
  //   setProgressMap((prev) => {
  //     const { [tempId]: _, ...rest } = prev;
  //     return rest;
  //   });
  //   setUploadXhrMap((prev) => {
  //     const copy = { ...prev };
  //     delete copy[tempId];
  //     return copy;
  //   });
  // }

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (uploadItem?.isUploading) {
      setErrorMessage("An upload is already in progress. Please wait.");
      setTimeout(() => setErrorMessage(""), 3000);
      e.target.value = "";
      return;
    }

    // if (file.size > maxFileSize) {
    //   setErrorMessage(`File "${file.name}" exceeds the 100MB limit.`);
    //   setTimeout(() => setErrorMessage(""), 3000);
    //   e.target.value = "";
    //   return;
    // }

    let detectedMimeType = file.type;

    if (!file.type) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const type = await fileTypeFromBuffer(arrayBuffer);
        if (type) {
          detectedMimeType = type.mime;
        }
      } catch (err) {
        console.error("Failed to detect file type with magic number:", err);
      }
    }

    const tempItem = {
      file,
      name: file.name,
      size: file.size,
      id: `temp-${Date.now()}`,
      isUploading: true,
      progress: 0,
      fileType: detectedMimeType,
    };

    setFilesList((prev) => [tempItem, ...prev]);
    setUploadItem(tempItem);
    e.target.value = "";

    setUploadItem((prev) => prev && { ...prev, isLoading: true });
    getPresignedUrlAndUpload(tempItem);
  }

  async function getPresignedUrlAndUpload(item) {
    try {
      // 1️⃣ Request signed URL from backend
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/file/uploads/initiate`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: item.name,
            filesize: item.size,
            fileType: item.fileType,
            directoryId: dirId || null,
          }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const { url, fileId } = data;
      if(fileId){
        setCurrentFileUploadId(fileId)
      }
      // 2️⃣ Upload to S3 using XHR to track progress
      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", item.fileType);

      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          const progress = (evt.loaded / evt.total) * 100;
          setProgressMap((prev) => ({ ...prev, [item.id]: progress }));
        }
      });

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/file/uploads/complete`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ fileId }),
            }
          );

          // Reset state and refresh directory listing
          setUploadItem(null);
          loadDirectory();
        } else {
          handleUploadError();
        }
      };

      xhr.onerror = handleUploadError;

      xhr.send(item.file);
    } catch (err) {
      console.log(err);
      handleUploadError(err.message);
    }

    function handleUploadError(message) {
      setErrorMessage(message || "Upload failed. Please try again.");
      setFilesList((prev) => prev.filter((f) => f.id !== item.id));
      setUploadItem(null);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  function startUpload(item) {
    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.open("POST", `${import.meta.env.VITE_BACKEND_URL}file/${dirId || ""}`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("filename", item.name);
    xhr.setRequestHeader("filesize", item.size);

    xhr.upload.addEventListener("progress", (evt) => {
      if (evt.lengthComputable) {
        const progress = (evt.loaded / evt.total) * 100;
        setUploadItem((prev) => (prev ? { ...prev, progress } : prev));
      }
    });

    xhr.onload = () => {
      setUploadItem(null);
      loadDirectory();
    };

    xhr.onerror = () => {
      setErrorMessage("This file is larger than the available space!");
      setFilesList((prev) => prev.filter((f) => f.id !== item.id));
      setUploadItem(null);
      setTimeout(() => setErrorMessage(""), 3000);
    };

    xhr.send(item.file);
  }

  async function handleCancelUpload(tempId) {
    console.log(currentFileUploadId)
    if (uploadItem && uploadItem.id === tempId && xhrRef.current) {
      xhrRef.current.abort();

      try {
        // Send cancel request to backend
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/file/cancel/${currentFileUploadId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.error("Error notifying backend about cancel:", err);
      }
    }

    setFilesList((prev) => prev.filter((f) => f.id !== tempId));
    setUploadItem(null);
  }

  async function confirmDelete(item) {
    try {
      if (item.isDirectory) {
        await deleteDirectory(item.id);
      } else {
        await deleteFile(item.id);
      }
      setDeleteItem(null);
      loadDirectory();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || err.message);
    }
  }

  async function handleCreateDirectory(e) {
    e.preventDefault();
    try {
      await createDirectory(dirId, newDirname);
      setNewDirname("New Folder");
      setShowCreateDirModal(false);
      loadDirectory();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || err.message);
    }
  }

  function openRenameModal(type, id, currentName) {
    setRenameType(type);
    setRenameId(id);
    setRenameValue(currentName);
    setShowRenameModal(true);
  }

  async function handleRenameSubmit(e) {
    e.preventDefault();
    try {
      if (renameType === "file") await renameFile(renameId, renameValue);
      else await renameDirectory(renameId, renameValue);

      setShowRenameModal(false);
      setRenameValue("");
      setRenameType(null);
      setRenameId(null);
      loadDirectory();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || err.message);
    }
  }

  useEffect(() => {
    const handleDocumentClick = () => setActiveContextMenu(null);
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const combinedItems = [
    ...directoriesList.map((d) => ({ ...d, isDirectory: true })),
    ...filesList.map((f) => ({ ...f, isDirectory: false })),
  ];

  return (
    <DirectoryContext.Provider
      value={{
        handleRowClick,
        activeContextMenu,
        handleContextMenu: (e, id) => {
          e.stopPropagation();
          e.preventDefault();
          setActiveContextMenu((prev) => (prev === id ? null : id));
        },
        getFileIcon,
        isUploading,
        progressMap,
        handleCancelUpload,
        setDeleteItem,
        openRenameModal,
        openDetailsPopup,
      }}
    >
      <div className="mx-2 md:mx-4">
        {errorMessage &&
          errorMessage !==
            "Directory not found or you do not have access to it!" && (
            <div className="error-message">{errorMessage}</div>
          )}

        <DirectoryHeader
          directoryName={directoryName}
          onCreateFolderClick={() => setShowCreateDirModal(true)}
          onUploadFilesClick={() => fileInputRef.current.click()}
          fileInputRef={fileInputRef}
          handleFileSelect={handleFileSelect}
          disabled={
            errorMessage ===
            "Directory not found or you do not have access to it!"
          }
        />

        {showCreateDirModal && (
          <CreateDirectoryModal
            newDirname={newDirname}
            setNewDirname={setNewDirname}
            onClose={() => setShowCreateDirModal(false)}
            onCreateDirectory={handleCreateDirectory}
          />
        )}

        {showRenameModal && (
          <RenameModal
            renameType={renameType}
            renameValue={renameValue}
            setRenameValue={setRenameValue}
            onClose={() => setShowRenameModal(false)}
            onRenameSubmit={handleRenameSubmit}
          />
        )}

        {detailsItem && (
          <DetailsPopup item={detailsItem} onClose={closeDetailsPopup} />
        )}

        {combinedItems.length === 0 ? (
          errorMessage ===
          "Directory not found or you do not have access to it!" ? (
            <p className="text-center text-gray-600 mt-4 italic">
              Directory not found or you do not have access to it!
            </p>
          ) : (
            <p className="text-center text-gray-600 mt-4 italic">
              This folder is empty. Upload files or create a folder to see some
              data.
            </p>
          )
        ) : (
          <DirectoryList items={combinedItems} />
        )}

        {deleteItem && (
          <ConfirmDeleteModal
            item={deleteItem}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteItem(null)}
          />
        )}
      </div>
    </DirectoryContext.Provider>
  );
}

export default DirectoryView;
