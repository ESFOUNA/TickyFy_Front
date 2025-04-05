declare global {
    interface Window {
      FB: any;
      fbAsyncInit: () => void;
      checkLoginState: () => void;
    }
  }
  
  export {};
  