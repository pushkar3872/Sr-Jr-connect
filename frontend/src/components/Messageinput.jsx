import React from 'react';
import { Image, Send } from "lucide-react";

const MessageInput = () => {
    return (
        <div className="pt-4 w-full">
            <form className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered  rounded-lg input-sm sm:input-md"
                        placeholder="Type a message"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        type="button"
                        className="btn-sm sm:flex justify-center sm:btn-md btn btn-circle text-emerald-500"
                    >
                        <Image size={20} />
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn-sm sm:flex sm:justify-center btn sm:btn-md btn-circle"
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;