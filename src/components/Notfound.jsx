import React from 'react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen  flex items-center justify-center overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
      </div>

      <div className="text-center p-8 max-w-2xl relative">
        {/* 404 Error Code */}
        <div 
          className="text-8xl md:text-9xl lg:text-[12rem] font-extrabold text-blue-500 leading-none mb-4 animate-bounce"
          style={{ 
            textShadow: '0 4px 8px rgba(59, 130, 246, 0.2)',
            animationDuration: '2s',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate'
          }}
        >
          404
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-600 mb-12 animate-pulse">
          Oops...page not found!
        </h1>

        {/* Character Container */}
        <div className="relative inline-block my-8">
          {/* Question Marks */}
          <div className="absolute -top-5 -left-12 md:-left-16 text-2xl md:text-3xl text-blue-500 opacity-70 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            ?
          </div>
          <div className="absolute top-12 -right-14 md:-right-20 text-2xl md:text-3xl text-blue-500 opacity-70 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
            ?
          </div>
          <div className="absolute bottom-5 -left-10 md:-left-14 text-xl md:text-2xl text-blue-500 opacity-70 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
            ?
          </div>

          {/* Character Body */}
          <div 
            className="relative mx-auto animate-bounce"
            style={{
              width: '120px',
              height: '160px',
              animationDuration: '3s',
              animationIterationCount: 'infinite'
            }}
          >
            {/* Main Body */}
            <div 
              className="bg-gradient-to-br from-blue-500 to-blue-600 relative mx-auto shadow-lg"
              style={{
                width: '120px',
                height: '160px',
                borderRadius: '60px 60px 30px 30px',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Face */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2">
                {/* Eyes */}
                <div className="flex gap-4 mb-3">
                  <div className="relative">
                    <div className="w-6 h-6 bg-slate-800 rounded-full animate-pulse" style={{ animationDuration: '4s' }}>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-6 h-6 bg-slate-800 rounded-full animate-pulse" style={{ animationDuration: '4s' }}>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Mouth */}
                <div 
                  className="w-7 h-4 border-3 border-slate-800 border-t-0 mx-auto"
                  style={{ borderRadius: '0 0 30px 30px' }}
                ></div>
              </div>

              {/* Arms */}
              <div 
                className="absolute top-20 -left-6 w-5 h-15 bg-blue-500 origin-top animate-pulse"
                style={{
                  borderRadius: '10px',
                  transform: 'rotate(-20deg)',
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate'
                }}
              ></div>
              <div 
                className="absolute top-20 -right-6 w-5 h-12 bg-blue-500"
                style={{
                  borderRadius: '10px',
                  transform: 'rotate(30deg)'
                }}
              ></div>

              {/* Legs */}
              <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex gap-5">
                <div 
                  className="w-4 h-10 bg-blue-500"
                  style={{ borderRadius: '9px' }}
                ></div>
                <div 
                  className="w-4 h-10 bg-blue-500"
                  style={{ borderRadius: '9px' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
            style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
          >
            Go Home
          </button>
          <button
            onClick={handleGoBack}
            className="px-8 py-4 bg-white text-blue-500 font-semibold text-lg rounded-full border-2 border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 transform"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Custom Styles for Complex Animations */}
      <style jsx>{`
        @keyframes scratchHead {
          0% { transform: rotate(-20deg); }
          100% { transform: rotate(-60deg); }
        }
        
        .scratch-head {
          animation: scratchHead 2s ease-in-out infinite alternate;
        }
        
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        
        .float-question {
          animation: floatUp 3s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 90%, 100% { height: 24px; }
          95% { height: 4px; }
        }
        
        .blink-eye {
          animation: blink 4s infinite;
        }
      `}</style>
    </div>
  );
}