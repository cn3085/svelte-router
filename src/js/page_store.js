import { writable } from "svelte/store";

export let pageContent = writable(null);
export let pageable = writable({
    number : 0,
    totalPages : 1,
    showNumber : 1,
    firstPageNum : 1,
    lastPageNum : 1,
    pageNumbers : []
});

export let setNumber = (number, totalPages) => {
    let showNumber = number + 1; //0페이지부터 시작
    
    let lastPageNum = Math.ceil(showNumber * 0.1) * 10;
    let firstPageNum = lastPageNum - 9;

    let pageNumbers = [];

    for(let i = firstPageNum; i <= totalPages && i <= lastPageNum; i++){
        pageNumbers.push(i);
    }

    let newPageable = {
        number : number,
        totalPages : totalPages,
        showNumber : showNumber,
        firstPageNum : firstPageNum,
        lastPageNum : lastPageNum,
        pageNumbers : pageNumbers
    }

    pageable.update(() => newPageable);

}

