import React from 'react'

function Comment({username, caption}) {
    return (
        <div className="comment">
        <p>
                <span style={{fontWeight:"500", marginRight:"4px"}}>
                
                {username}

                </span>

                {caption}
                
                
                </p>
            
        </div>
    )
}

export default Comment
