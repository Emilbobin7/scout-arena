import API from "../services/api";

function UploadVideo() {
    const upload = async (e) => {
        const formData = new FormData();
        formData.append("video", e.target.files[0]);
        await API.post("/videos", formData);
        alert("Uploaded");
    };

    return (
        <input type="file" onChange={upload} />
    );
}

export default UploadVideo;
