import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { editProfile } from './FirestoreApis';

export const uploadImage = (file, id, setModalOpen, setProgress, setCurrentImage) => {
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
            setProgress(progress);
        },
        // Logging errors
        (error) => {
            console.error(error); // Change 'err' to 'error' here
        },
        // Getting our images
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                editProfile(id, { imageLink: response });
                setModalOpen(false);
                setCurrentImage({});
                setProgress(0);
            });
        }
    );
};
