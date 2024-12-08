// عند الضغط على زر بدء اللعبة
document.querySelector(".control-buttons span").onclick = function () {
  // طلب اسم اللاعب
  let yourName = prompt("What's Your Name?");
  if (yourName === null || yourName.trim() === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  // إزالة واجهة بدء اللعبة
  document.querySelector(".control-buttons").remove();
};

// تحديد مدة التأخير
let duration = 1000;

// إضافة أصوات للنجاح والفشل
let successAudio = new Audio("sounds/success.mp3");
let failAudio = new Audio("sounds/fail.mp3");

// تحديد حاوية الكروت
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

// خلط ترتيب الكروت
shuffle(orderRange);

// تعيين ترتيب عشوائي للكروت وإضافة أحداث النقر
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => flipBlock(block));
});

// دالة لقلب الكارت
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  // جمع الكروت المقلوبة
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // إذا كان هناك كارتان مقلوبان
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// دالة لإيقاف النقر مؤقتًا
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// دالة للتحقق من تطابق الكروت
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  // إذا كانت الكروت متطابقة
  if (firstBlock.dataset.natural === secondBlock.dataset.natural) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    // تشغيل صوت النجاح
    successAudio.play();

    // التحقق إذا كانت اللعبة قد انتهت
    if (blocks.every((block) => block.classList.contains("has-match"))) {
      setTimeout(() => {
        alert("Congratulations! You won the game 🎉");
        location.reload(); // إعادة تحميل اللعبة
      }, duration);
    }
  } else {
    // إذا كانت الكروت غير متطابقة
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");

      // تشغيل صوت الفشل
      failAudio.play();
    }, duration);
  }
}

// دالة لخلط ترتيب الكروت
function shuffle(array) {
  let current = array.length, temp, random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
