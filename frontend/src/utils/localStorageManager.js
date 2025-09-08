export class localStorageManager{
    setBackgroundImage(imageData){
        localStorage.setItem('bgImage', imageData);
    }

    setStarterImage(imageData){
        localStorage.setItem('stImage', imageData);
    }

    getBackgroundImage(){
        return localStorage.getItem('bgImage');
    }

    getStarterImage(){
        return localStorage.getItem('stImage');
    }
}