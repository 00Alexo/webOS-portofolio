export const fileSystem = {
    '/':{
        type: 'root',
        name: 'root',
        children:{
            'user':{
                type: 'directory',
                name: 'user',
                children: {
                    'home':{
                        type: 'directory',
                        name: 'home',
                    },
                    'desktop':{
                        type:'directory',
                        name: 'desktop',
                    },
                    'webOS':{
                        type:'file',
                        name:'webOS',
                        size:'1.5MB',
                        extension:'.js'
                    }
                }
            }
        }
    }
}

export class FileSystemManager{
    constructor(fileSystem){
        this.fileSystem = fileSystem;
        this.currentPath = '/user';
    }

    getCurrentPath(){
        return this.currentPath;
    }

    setCurrentPath(newPath){
        this.currentPath = newPath;
    }
    
    ls(){
        const pathParts = this.currentPath.split('/').filter(part => part !== '');
        let currentNode = this.fileSystem['/'];
        
        for (const part of pathParts){
            if(currentNode.children && currentNode.children[part]){
                currentNode = currentNode.children[part];
            } else {
                return [];
            }
        }

        if(currentNode.children){
            return Object.values(currentNode.children);
        } else {
            return [];
        }
    }

    cd(dirName){
        const newPath = `${this.currentPath}/${dirName}`;
        if(this.ls().some(item => item.name === dirName && item.type === 'directory')){
            this.setCurrentPath(newPath);
            return {success: true, newPath: this.currentPath};
        } else {
            return {error: `Directory not found: ${dirName}`};
        }
    }

    cb() {
        if (this.currentPath === '/') {
            return { error: "Already at root directory" };
        }
        
        const pathParts = this.currentPath.split('/').filter(part => part !== '');
        pathParts.pop();
        
        const newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
        this.currentPath = newPath;
        
        return { newPath: newPath };
    }
}


// type: 'directory',
//     name: '',
//     children: {
//       'home': {
//         type: 'directory',
//         name: 'home',
//         children: {
//           'user': {
//             type: 'directory',
//             name: 'user',
//             children: {
//               'documents': {
//                 type: 'directory',
//                 name: 'documents',
//                 children: {
//                   'resume.pdf': { type: 'file', name: 'resume.pdf', size: '2.1MB' },
//                   'projects': {
//                     type: 'directory',
//                     name: 'projects',
//                     children: {
//                       'webos-portfolio': {
//                         type: 'directory',
//                         name: 'webos-portfolio',
//                         children: {
//                           'README.md': { type: 'file', name: 'README.md', size: '1.2KB' },
//                           'package.json': { type: 'file', name: 'package.json', size: '0.8KB' }
//                         }
//                       }
//                     }
//                   }
//                 }
//               },
//               'downloads': {
//                 type: 'directory',
//                 name: 'downloads',
//                 children: {
//                   'setup.exe': { type: 'file', name: 'setup.exe', size: '15.2MB' },
//                   'image.png': { type: 'file', name: 'image.png', size: '2.8MB' }
//                 }
//               },