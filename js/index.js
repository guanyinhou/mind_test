// const { default: axios } = require("axios");

const app = new Vue({
    el: "#app",
    data: {
        questionIdx: 0,
        result: [],
        titleCn: "",
        titleEn: "",
        questionList: [],
        questions: [],
        resultList: [],
        cateEng: []
    },
    methods: {
        getData() {
            const url = "https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json";
            axios.get(url)
                .then(res=>{
                    // 提取資料
                    this.result = res.data;
                    this.titleCn = this.result.name.zh.substring(0,10);
                    this.titleEn = this.result.name.en.substring(0,32);
                    // this.question = this.question.push(this.result.agreeableness.problems.problem);
                    this.problemList = this.result.problemList;
                    console.log(this.result);
                    console.log(this.problemList);
                    this.titleEng = this.result.traits;
                    console.log(this.titleEng);

                    // const {name, desc, degree, traits, problemList} = res.data;

                    // 將一部分資料塞入problemList
                    for(index in this.problemList){
                        this.questionList.push({
                            index,
                            name: this.problemList[index].name,
                            desc: this.problemList[index].description,
                            point: [0, 0]
                        })
                        this.problemList[index].problems.forEach(item=>this.questions.push(item));
                    }
                    // this.questions.forEach(item=>item.options.reverse());
                    console.log(this.questions);
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        nextPage(id) {
            this.questionIdx += 1;
            // if(questionList.index===)
        },
        getResult(id) {
            this.questionList.forEach(item=>{
                this.questionIdx = 11;
                // people.reduce(function(accumulator, currentValue, currentIndex, array)
                // 初始值=0
                const numTotal = item.point.reduce((preVal, curVal)=> preVal + curVal, 0);
                switch(numTotal) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        this.resultList.push({
                            total: numTotal,
                            degree: "低",
                            category: item.index,
                            descriiption: item.desc.desc,
                            explain: item.desc.low,
                            name: item.name
                        })
                        break;
                    case 6:
                        this.resultList.push({
                            total: numTotal,
                            degree: "中",
                            category: item.index,
                            descriiption: item.desc.desc,
                            explain: item.desc.middle,
                            name: item.name
                        })
                        break;
                    case 7:
                        this.resultList.push({
                            total: numTotal,
                            degree: "高",
                            category: item.index,
                            descriiption: item.desc.desc,
                            explain: item.desc.high,
                            name: item.name
                        })
                        break;
                }
                console.log(this.resultList);
            })
        },
        reset() {
            this.questionIdx =  0;
            this.resultList = [];
            // 清空分數
            this.questionList.forEach(item=>item.point = [0, 0]);
        }
    },
    created() {
        this.getData();
    }
})