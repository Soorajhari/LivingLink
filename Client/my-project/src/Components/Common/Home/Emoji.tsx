// import React, { useState } from 'react';
// import 'emoji-mart/css/emoji-mart.css';
// import { Picker,BaseEmoji } from 'emoji-mart';


// function EmojiPicker({ onEmojiSelect }:any) {
//     const [showPicker, setShowPicker] = useState(false);
  
//     const handleEmojiSelect = (emoji: BaseEmoji) => {
//         setShowPicker(false);
//         onEmojiSelect(emoji);
//       };
//     return (
//       <div>
//         <button onClick={() => setShowPicker(!showPicker)}>Toggle Emoji Picker</button>
//         {showPicker && (
//           <Picker
//             set="emojione"
//             onSelect={handleEmojiSelect}
//             emojiSize={24}
//             title="Pick your emoji"
//           />
//         )}
//       </div>
//     );
//   }

//   export default EmojiPicker
  