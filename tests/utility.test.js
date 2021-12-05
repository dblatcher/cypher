import {shuffleArray} from "../src/utility";


test ("it can shuffle an empty array",() => {
    expect(shuffleArray([])).toEqual([]);
})

test ("it can shuffle an array of numbers",() => {
    const subject = [1,2,3];
    shuffleArray(subject);
    expect(subject.length).toEqual(3);
    expect(subject).toEqual(expect.arrayContaining([1,2,3]));
})

test ("it can shuffle an array of objects",() => {

    const a = {name:"a"};
    const b = {name:"b"};
    const c = {name:"c"};

    const subject = [a,b,c];
    shuffleArray(subject);
    expect(subject.length).toEqual(3);
    expect(subject).toEqual(expect.arrayContaining([a,b,c]));
})