import React, { useRef, useState } from 'react';
import { Image, Send, X } from "lucide-react";
import { useAuthstore } from '../store/useAuthstore';
import { useChatstore } from '../store/useChatstore';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const { sendchatmessage } = useChatstore();
    const { authUser } = useAuthstore();
    const [text, settext] = useState("");
    const [imagepreview, setimagepreview] = useState(null);
    const fileInputRef = useRef(null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(file); 
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image first !")
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setimagepreview(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const removeImage = (e) => {
        setimagepreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        };
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagepreview) return;
        try {
            await sendchatmessage({ text, image: imagepreview });
            settext("");
            setimagepreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Error in sending message:", error.message);
            toast.error("Failed to send message");
        }
    }


    return (
        <div className="pt-4 w-full">
            {imagepreview && (
                // <div className="mb-3 flex items-center gap-2 justify-end bg-amber-200 ">
                <div className="relative inline-block max-w-[300px] max-h-[300px] pb-1">
                    <img
                        src={imagepreview}
                        alt="Preview"
                        className="h-32 object-cover rounded-lg border border-zinc-700"
                    />
                    <button
                        className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer"
                        type="button"
                        onClick={removeImage}
                    >
                        <X className="size-4" />
                    </button>
                </div>
                // </div>
            )}

            <form onSubmit={handlesubmit} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message"
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className="btn-sm sm:flex justify-center sm:btn-md btn btn-circle text-emerald-500"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn-sm sm:flex sm:justify-center btn sm:btn-md btn-circle"
                    disabled={!text.trim() && !imagepreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>

    );
};

export default MessageInput;