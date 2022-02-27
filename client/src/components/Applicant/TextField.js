
import React, {useRef} from 'react'

const TextField = ({onFileSelectSuccess, onFileSelectError, className, aria_describedby, id, type, accept, maxSize}) => {

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file.size > maxSize*1000000){
            e.target.value = null;
    
            onFileSelectError({ error: "File size cannot exceed more than " + maxSize.toString() + "MB" });
        }
        else if(file.size <= maxSize) {
            onFileSelectSuccess(file);
        }
    }

    return (
        <input 
            className={className}
            aria-describedby={aria_describedby}
            id={id}
            type={type}
            required
            onChange={handleFileInput}
            accept={accept}/>
    )
}

export default FileUploader;