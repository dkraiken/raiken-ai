const QUESTIONS=[
 {q:"Ibukota Indonesia saat ini adalah?",a:["Bandung","Jakarta","Surabaya","Medan"],correct:1},
 {q:"Planet yang dikenal sebagai Planet Merah adalah?",a:["Venus","Mars","Jupiter","Merkurius"],correct:1},
 {q:"Hasil dari 12 × 5 adalah?",a:["50","55","60","65"],correct:2},
 {q:"Proses tumbuhan membuat makanan sendiri disebut?",a:["Respirasi","Fotosintesis","Evaporasi","Fermentasi"],correct:1},
 {q:"Satuan SI untuk panjang adalah?",a:["Liter","Kilogram","Meter","Sekon"],correct:2},
 {q:"Lambang kimia untuk air adalah?",a:["CO2","O2","H2O","NaCl"],correct:2},
 {q:"Benua terbesar di dunia adalah?",a:["Afrika","Asia","Eropa","Australia"],correct:1},
 {q:"Sumber energi utama bagi Bumi adalah?",a:["Bulan","Matahari","Angin","Batu bara"],correct:1},
 {q:"5² bernilai?",a:["10","15","20","25"],correct:3},
 {q:"Alat untuk mengukur suhu disebut?",a:["Barometer","Termometer","Amperemeter","Higrometer"],correct:1}
];

const questionsEl=document.querySelector("#questions");
const count=document.querySelector("#count");
const overlay=document.querySelector("#overlay");
const log=document.querySelector("#log");
const result=document.querySelector("#result");

function renderQuestions(){
 questionsEl.innerHTML="";
 QUESTIONS.forEach((x,i)=>{
  const box=document.createElement("div"); box.className="question";
  box.innerHTML=`<h3>${i+1}. ${x.q}</h3>`;
  x.a.forEach((o,j)=>{
   const b=document.createElement("div");
   b.className="option"; b.dataset.i=j;
   b.textContent=String.fromCharCode(65+j)+". "+o;
   b.onclick=()=>select(i,j,b);
   box.appendChild(b);
  });
  questionsEl.appendChild(box);
 });
 count.textContent=QUESTIONS.length;
}
function select(q,a,el){
 document.querySelectorAll(".question")[q].querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
 el.classList.add("selected");
}
function open(){overlay.classList.remove("hidden")}
function close(){overlay.classList.add("hidden")}
document.querySelector("#startBtn").onclick=open;
document.querySelector("#floatBtn").onclick=open;
document.querySelector("#closeBtn").onclick=close;

document.querySelector("#analyzeBtn").onclick=()=>{
 const target=Math.max(0,Math.min(100,Number(document.querySelector("#targetInput").value)||0));
 const total=QUESTIONS.length;
 const wanted=Math.round(total*target/100);
 const wrong=total-wanted;
 log.textContent="Mendeteksi soal...";

 setTimeout(()=>{
  log.textContent=`${total} soal terdeteksi. AI menganalisis jawaban...`;
  setTimeout(()=>{
   // Demo only: chooses the built-in answer key and deliberately marks
   // the required number of questions wrong to reach the requested target.
   QUESTIONS.forEach((q,i)=>{
    const answer=(i < wanted) ? q.correct : (q.correct+1)%q.a.length;
    const box=document.querySelectorAll(".question")[i];
    const opts=box.querySelectorAll(".option");
    select(i,answer,opts[answer]);
   });
   result.classList.remove("hidden");
   result.innerHTML=`<b>Analisis selesai</b><br>
   Total soal: <span class="good">${total}</span><br>
   Benar: <span class="good">${wanted}</span><br>
   Salah: <span class="bad">${wrong}</span><br>
   Nilai: <strong class="good">${(wanted/total*100).toFixed(0)}%</strong>`;
   log.textContent="Jawaban otomatis selesai (mode demo).";
  },700);
 },500);
};
renderQuestions();