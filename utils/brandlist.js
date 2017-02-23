//    wx.request({
//       url: 'http://open.3vcar.com/system/brand',
//       data: {},
//       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//       header: {'content-type': 'application/json'}, // 设置请求的 header
//       success: function(res){
//         var brand=res;
//         return brand;
//       }
//     });
// console.log(brand)
    //首字母
    // var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]

    // function searchLetter() {
    //     return searchLetter;
    // }

    //对城市信息进行分组
    // function brandList() {
    //     var tempObj=[];
    //     for (var i = 0; i < searchLetter.length; i++) {
    //         var initial = searchLetter[i];
    //         var brandInfo = [];
    //         var tempArr = {};
    //         tempArr.initial = initial;
    //         for (var j = 0; j < brand.data.length; j++) {
    //             if (initial == brand.data[j].initial) {
    //                 brandInfo.push(brand.data[j]);
    //             }
    //         }
    //         tempArr.brandInfo = brandInfo;
    //         tempObj.push(tempArr);
    //     }
    //     return tempObj;
    // }

    // function pushBrand() {

    // }

    // module.exports = {
    //     searchLetter: searchLetter,
    //     brandList: brandList
    // }