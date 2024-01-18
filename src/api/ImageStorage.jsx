import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const uploadImage = (file, setimageLink) => {
    // This is the file we will upload our file to
    const profilePicRef = ref(storage,`profileImgs/${file.name}`);
    const uploadTask = uploadBytesResumable(profilePicRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Bytes transferred / bytes available
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
        },
        // Logging errors
        (error) => {
            console.error(error); // Change 'err' to 'error' here
        },
        // Getting our images
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                setimageLink(response)
            });
        }
    );
};
