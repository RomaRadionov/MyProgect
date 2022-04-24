var important = document.getElementById('important');
var left = document.getElementById('left');
var right = document.getElementById('right');

function isValid(n) {
	let min = 1;
	let max = 5;
    if (n >= min && n <= max) {
        return true;
    }
    return false;
}

left.addEventListener('click', function(e){
	let n = parseInt(important.value);
    --n;
	let val = isValid(n);
	if(!!val) {
		important.value = n;
        console.log("Inc: %d", n);
    }
});

right.addEventListener('click', function(e){
	let n = parseInt(important.value);
    ++n;
	let val = isValid(n);
	if(!!val) {
		important.value = n;
        console.log("Dec: %d", n);
    }
});