var x = 10; //global

let y = 30; //init variable
const z = 20;
x = "hello world!";

console.log(x); //in ra man hinh

let f = y>10;
if(f){
    console.log("y lon hon 10");
}else{
     console.log("y nho hon 10");
}

for(let i=0; i<10; i++){
    console.log("Xin chao "+i);
}

x = "10";
y = 20;
x = parseInt(x); // bien chuoi thanh chu
console.log(x+y);

k = "Hello";
k = parseInt(k);
console.log(k); // --> NaN: Not all Number

if(isNaN(k)) {
    console.log("khong phai so");
}else{
    console.log(k);
}

let ary = [1,2,3];
ary[3] = "hello";
ary[4] = [5,6,7,"xin chao"];
sayHello(); // goi truoc hay sau deu duoc
function sayHello(){
    console.log("Hello everybody");
}
c=sum(1,6);
console.log(c);
function sum(a,b){
    return a+b;
}

let arr = [5,1,5,63,6];
arr.map(function (e) {
    console.log(e);
})
arr.push(77); //them 1 so trong day khong can quan tam so thu tu, tu dong them vao sau

function checkSNT(n) {
    if(n<2) return false;
    if(n<=3) return true;
    for(let i=2; i<= Math.sqrt(n);i++){
        if(n%i==0) return false;
    }
    return true;
}

let snt = [];
for(let i=0; i<100; i++){
    if(checkSNT(i))
        snt.push(i);
}

for(let i=0; i < snt.length; i++){
    console.log(snt[i]);
}
snt.map(function (e) {
    console.log(e);
})
snt.map(e=>{
    console.log(e); // nhu tren, khac cach viet
})
