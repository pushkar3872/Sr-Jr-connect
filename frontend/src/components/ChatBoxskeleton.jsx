export default function ChatBoxskeleton() {
    const skeletonMessages = Array(5).fill(null);

    // Function to generate random width
    const getRandomWidth = () => {
        const minWidth = 150; // minimum width in pixels
        const maxWidth = 300; // maximum width in pixels
        return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "none" }}>
            {skeletonMessages.map((_, idx) => {
                return (
                    <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} items-center`}>
                        {idx % 2 == 0 ? (
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full">
                                    <div className="skeleton w-full h-full rounded-full"></div>
                                </div>
                            </div>
                        ) : null}

                        <div className="chat-header mb-1">
                            <div className="skeleton h-4 w-16" />
                        </div>

                        <div className="chat-bubble p-0 skeleton">
                            <div className="h-9" style={{ width: `${getRandomWidth()}px` }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
