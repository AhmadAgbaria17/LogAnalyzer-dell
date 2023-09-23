let max = 0;
let maxidx = 0;
let sum = 0;
let avg = 0;
let errors = [2, 1, 2, 1, 2, 3];
console.log(errors);
for (let i = 0; i < errors.length; i++) {
  console.log(errors[i]);
  sum += errors[i];
  if (errors[i] > max) {
    max = errors[i];
    maxidx = i;
  }
}
avg = sum / errors.length;
console.log(sum, avg, max, maxidx);
