// 城市列表
var _citys = [
  { "code": 513200, "initial": "A", "name": "阿坝" },
  { "code": 652900, "initial": "A", "name": "阿克苏" },
  { "code": 152900, "initial": "A", "name": "阿拉善" },
  { "code": 654300, "initial": "A", "name": "阿勒泰" },
  { "code": 542500, "initial": "A", "name": "阿里" },
  { "code": 610900, "initial": "A", "name": "安康" },
  { "code": 340800, "initial": "A", "name": "安庆" },
  { "code": 520400, "initial": "A", "name": "安顺" },
  { "code": 410500, "initial": "A", "name": "安阳" },
  { "code": 210300, "initial": "A", "name": "鞍山" },
  { "code": 150800, "initial": "B", "name": "巴彦淖尔" },
  { "code": 652800, "initial": "B", "name": "巴音郭楞" },
  { "code": 511900, "initial": "B", "name": "巴中" },
  { "code": 220800, "initial": "B", "name": "白城" },
  { "code": 220600, "initial": "B", "name": "白山" },
  { "code": 620400, "initial": "B", "name": "白银" },
  { "code": 451000, "initial": "B", "name": "百色" },
  { "code": 340300, "initial": "B", "name": "蚌埠" },
  { "code": 150200, "initial": "B", "name": "包头" },
  { "code": 610300, "initial": "B", "name": "宝鸡" },
  { "code": 130600, "initial": "B", "name": "保定" },
  { "code": 530500, "initial": "B", "name": "保山" },
  { "code": 450500, "initial": "B", "name": "北海" },
  { "code": 110000, "initial": "B", "name": "北京" },
  { "code": 210500, "initial": "B", "name": "本溪" },
  { "code": 520500, "initial": "B", "name": "毕节" },
  { "code": 371600, "initial": "B", "name": "滨州" },
  { "code": 341600, "initial": "B", "name": "亳州" },
  { "code": 652700, "initial": "B", "name": "博尔塔拉" },
  { "code": 130900, "initial": "C", "name": "沧州" },
  { "code": 540300, "initial": "C", "name": "昌都" },
  { "code": 652300, "initial": "C", "name": "昌吉" },
  { "code": 220100, "initial": "C", "name": "长春" },
  { "code": 430100, "initial": "C", "name": "长沙" },
  { "code": 140400, "initial": "C", "name": "长治" },
  { "code": 430700, "initial": "C", "name": "常德" },
  { "code": 320400, "initial": "C", "name": "常州" },
  { "code": 211300, "initial": "C", "name": "朝阳" },
  { "code": 445100, "initial": "C", "name": "潮州" },
  { "code": 431000, "initial": "C", "name": "郴州" },
  { "code": 510100, "initial": "C", "name": "成都" },
  { "code": 130800, "initial": "C", "name": "承德" },
  { "code": 341700, "initial": "C", "name": "池州" },
  { "code": 150400, "initial": "C", "name": "赤峰" },
  { "code": 451400, "initial": "C", "name": "崇左" },
  { "code": 341100, "initial": "C", "name": "滁州" },
  { "code": 532300, "initial": "C", "name": "楚雄" },
  { "code": 511700, "initial": "D", "name": "达州" },
  { "code": 532900, "initial": "D", "name": "大理" },
  { "code": 210200, "initial": "D", "name": "大连" },
  { "code": 230600, "initial": "D", "name": "大庆" },
  { "code": 140200, "initial": "D", "name": "大同" },
  { "code": 232700, "initial": "D", "name": "大兴安岭" },
  { "code": 210600, "initial": "D", "name": "丹东" },
  { "code": 533100, "initial": "D", "name": "德宏" },
  { "code": 510600, "initial": "D", "name": "德阳" },
  { "code": 371400, "initial": "D", "name": "德州" },
  { "code": 533400, "initial": "D", "name": "迪庆" },
  { "code": 621100, "initial": "D", "name": "定西" },
  { "code": 441900, "initial": "D", "name": "东莞" },
  { "code": 370500, "initial": "D", "name": "东营" },
  { "code": 150600, "initial": "E", "name": "鄂尔多斯" },
  { "code": 420700, "initial": "E", "name": "鄂州" },
  { "code": 422800, "initial": "E", "name": "恩施" },
  { "code": 450600, "initial": "F", "name": "防城港" },
  { "code": 440600, "initial": "F", "name": "佛山" },
  { "code": 350100, "initial": "F", "name": "福州" },
  { "code": 210400, "initial": "F", "name": "抚顺" },
  { "code": 361000, "initial": "F", "name": "抚州" },
  { "code": 210900, "initial": "F", "name": "阜新" },
  { "code": 341200, "initial": "F", "name": "阜阳" },
  { "code": 623000, "initial": "G", "name": "甘南" },
  { "code": 513300, "initial": "G", "name": "甘孜" },
  { "code": 360700, "initial": "G", "name": "赣州" },
  { "code": 640400, "initial": "G", "name": "固原" },
  { "code": 511600, "initial": "G", "name": "广安" },
  { "code": 510800, "initial": "G", "name": "广元" },
  { "code": 440100, "initial": "G", "name": "广州" },
  { "code": 450800, "initial": "G", "name": "贵港" },
  { "code": 520100, "initial": "G", "name": "贵阳" },
  { "code": 450300, "initial": "G", "name": "桂林" },
  { "code": 632600, "initial": "G", "name": "果洛" },
  { "code": 230100, "initial": "H", "name": "哈尔滨" },
  { "code": 652200, "initial": "H", "name": "哈密" },
  { "code": 632200, "initial": "H", "name": "海北" },
  { "code": 630200, "initial": "H", "name": "海东" },
  { "code": 460100, "initial": "H", "name": "海口" },
  { "code": 632500, "initial": "H", "name": "海南" },
  { "code": 632800, "initial": "H", "name": "海西" },
  { "code": 130400, "initial": "H", "name": "邯郸" },
  { "code": 610700, "initial": "H", "name": "汉中" },
  { "code": 330100, "initial": "H", "name": "杭州" },
  { "code": 340100, "initial": "H", "name": "合肥" },
  { "code": 653200, "initial": "H", "name": "和田" },
  { "code": 451200, "initial": "H", "name": "河池" },
  { "code": 441600, "initial": "H", "name": "河源" },
  { "code": 371700, "initial": "H", "name": "菏泽" },
  { "code": 451100, "initial": "H", "name": "贺州" },
  { "code": 410600, "initial": "H", "name": "鹤壁" },
  { "code": 230400, "initial": "H", "name": "鹤岗" },
  { "code": 231100, "initial": "H", "name": "黑河" },
  { "code": 131100, "initial": "H", "name": "衡水" },
  { "code": 430400, "initial": "H", "name": "衡阳" },
  { "code": 532500, "initial": "H", "name": "红河" },
  { "code": 150100, "initial": "H", "name": "呼和浩特" },
  { "code": 150700, "initial": "H", "name": "呼伦贝尔" },
  { "code": 330500, "initial": "H", "name": "湖州" },
  { "code": 211400, "initial": "H", "name": "葫芦岛" },
  { "code": 431200, "initial": "H", "name": "怀化" },
  { "code": 320800, "initial": "H", "name": "淮安" },
  { "code": 340600, "initial": "H", "name": "淮北" },
  { "code": 340400, "initial": "H", "name": "淮南" },
  { "code": 421100, "initial": "H", "name": "黄冈" },
  { "code": 632300, "initial": "H", "name": "黄南" },
  { "code": 341000, "initial": "H", "name": "黄山" },
  { "code": 420200, "initial": "H", "name": "黄石" },
  { "code": 441300, "initial": "H", "name": "惠州" },
  { "code": 230300, "initial": "J", "name": "鸡西" },
  { "code": 360800, "initial": "J", "name": "吉安" },
  { "code": 220200, "initial": "J", "name": "吉林" },
  { "code": 370100, "initial": "J", "name": "济南" },
  { "code": 370800, "initial": "J", "name": "济宁" },
  { "code": 230800, "initial": "J", "name": "佳木斯" },
  { "code": 330400, "initial": "J", "name": "嘉兴" },
  { "code": 620200, "initial": "J", "name": "嘉峪关" },
  { "code": 440700, "initial": "J", "name": "江门" },
  { "code": 410800, "initial": "J", "name": "焦作" },
  { "code": 445200, "initial": "J", "name": "揭阳" },
  { "code": 620300, "initial": "J", "name": "金昌" },
  { "code": 330700, "initial": "J", "name": "金华" },
  { "code": 210700, "initial": "J", "name": "锦州" },
  { "code": 140500, "initial": "J", "name": "晋城" },
  { "code": 140700, "initial": "J", "name": "晋中" },
  { "code": 420800, "initial": "J", "name": "荆门" },
  { "code": 421000, "initial": "J", "name": "荆州" },
  { "code": 360200, "initial": "J", "name": "景德镇" },
  { "code": 360400, "initial": "J", "name": "九江" },
  { "code": 620900, "initial": "J", "name": "酒泉" },
  { "code": 653100, "initial": "K", "name": "喀什" },
  { "code": 410200, "initial": "K", "name": "开封" },
  { "code": 650200, "initial": "K", "name": "克拉玛依" },
  { "code": 653000, "initial": "K", "name": "克孜勒苏" },
  { "code": 530100, "initial": "K", "name": "昆明" },
  { "code": 540100, "initial": "L", "name": "拉萨" },
  { "code": 451300, "initial": "L", "name": "来宾" },
  { "code": 371200, "initial": "L", "name": "莱芜" },
  { "code": 620100, "initial": "L", "name": "兰州" },
  { "code": 131000, "initial": "L", "name": "廊坊" },
  { "code": 511100, "initial": "L", "name": "乐山" },
  { "code": 530700, "initial": "L", "name": "丽江" },
  { "code": 331100, "initial": "L", "name": "丽水" },
  { "code": 320700, "initial": "L", "name": "连云港" },
  { "code": 513400, "initial": "L", "name": "凉山" },
  { "code": 211000, "initial": "L", "name": "辽阳" },
  { "code": 220400, "initial": "L", "name": "辽源" },
  { "code": 371500, "initial": "L", "name": "聊城" },
  { "code": 540400, "initial": "L", "name": "林芝" },
  { "code": 530900, "initial": "L", "name": "临沧" },
  { "code": 141000, "initial": "L", "name": "临汾" },
  { "code": 622900, "initial": "L", "name": "临夏" },
  { "code": 371300, "initial": "L", "name": "临沂" },
  { "code": 450200, "initial": "L", "name": "柳州" },
  { "code": 341500, "initial": "L", "name": "六安" },
  { "code": 520200, "initial": "L", "name": "六盘水" },
  { "code": 350800, "initial": "L", "name": "龙岩" },
  { "code": 621200, "initial": "L", "name": "陇南" },
  { "code": 431300, "initial": "L", "name": "娄底" },
  { "code": 510500, "initial": "L", "name": "泸州" },
  { "code": 141100, "initial": "L", "name": "吕梁" },
  { "code": 410300, "initial": "L", "name": "洛阳" },
  { "code": 411100, "initial": "L", "name": "漯河" },
  { "code": 340500, "initial": "M", "name": "马鞍山" },
  { "code": 440900, "initial": "M", "name": "茂名" },
  { "code": 511400, "initial": "M", "name": "眉山" },
  { "code": 441400, "initial": "M", "name": "梅州" },
  { "code": 510700, "initial": "M", "name": "绵阳" },
  { "code": 231000, "initial": "M", "name": "牡丹江" },
  { "code": 511000, "initial": "N", "name": "内江" },
  { "code": 542400, "initial": "N", "name": "那曲" },
  { "code": 360100, "initial": "N", "name": "南昌" },
  { "code": 511300, "initial": "N", "name": "南充" },
  { "code": 320100, "initial": "N", "name": "南京" },
  { "code": 450100, "initial": "N", "name": "南宁" },
  { "code": 350700, "initial": "N", "name": "南平" },
  { "code": 320600, "initial": "N", "name": "南通" },
  { "code": 411300, "initial": "N", "name": "南阳" },
  { "code": 330200, "initial": "N", "name": "宁波" },
  { "code": 350900, "initial": "N", "name": "宁德" },
  { "code": 533300, "initial": "N", "name": "怒江" },
  { "code": 510400, "initial": "P", "name": "攀枝花" },
  { "code": 211100, "initial": "P", "name": "盘锦" },
  { "code": 410400, "initial": "P", "name": "平顶山" },
  { "code": 620800, "initial": "P", "name": "平凉" },
  { "code": 360300, "initial": "P", "name": "萍乡" },
  { "code": 350300, "initial": "P", "name": "莆田" },
  { "code": 410900, "initial": "P", "name": "濮阳" },
  { "code": 530800, "initial": "P", "name": "普洱" },
  { "code": 230900, "initial": "Q", "name": "七台河" },
  { "code": 230200, "initial": "Q", "name": "齐齐哈尔" },
  { "code": 522600, "initial": "Q", "name": "黔东南" },
  { "code": 522700, "initial": "Q", "name": "黔南" },
  { "code": 522300, "initial": "Q", "name": "黔西南" },
  { "code": 450700, "initial": "Q", "name": "钦州" },
  { "code": 130300, "initial": "Q", "name": "秦皇岛" },
  { "code": 370200, "initial": "Q", "name": "青岛" },
  { "code": 441800, "initial": "Q", "name": "清远" },
  { "code": 621000, "initial": "Q", "name": "庆阳" },
  { "code": 530300, "initial": "Q", "name": "曲靖" },
  { "code": 330800, "initial": "Q", "name": "衢州" },
  { "code": 350500, "initial": "Q", "name": "泉州" },
  { "code": 540200, "initial": "R", "name": "日喀则" },
  { "code": 371100, "initial": "R", "name": "日照" },
  { "code": 411200, "initial": "S", "name": "三门峡" },
  { "code": 350400, "initial": "S", "name": "三明" },
  { "code": 460300, "initial": "S", "name": "三沙" },
  { "code": 460200, "initial": "S", "name": "三亚" },
  { "code": 542200, "initial": "S", "name": "山南" },
  { "code": 440500, "initial": "S", "name": "汕头" },
  { "code": 441500, "initial": "S", "name": "汕尾" },
  { "code": 611000, "initial": "S", "name": "商洛" },
  { "code": 411400, "initial": "S", "name": "商丘" },
  { "code": 310000, "initial": "S", "name": "上海" },
  { "code": 361100, "initial": "S", "name": "上饶" },
  { "code": 440200, "initial": "S", "name": "韶关" },
  { "code": 430500, "initial": "S", "name": "邵阳" },
  { "code": 330600, "initial": "S", "name": "绍兴" },
  { "code": 440300, "initial": "S", "name": "深圳" },
  { "code": 210100, "initial": "S", "name": "沈阳" },
  { "code": 420300, "initial": "S", "name": "十堰" },
  { "code": 130100, "initial": "S", "name": "石家庄" },
  { "code": 640200, "initial": "S", "name": "石嘴山" },
  { "code": 230500, "initial": "S", "name": "双鸭山" },
  { "code": 140600, "initial": "S", "name": "朔州" },
  { "code": 220300, "initial": "S", "name": "四平" },
  { "code": 220700, "initial": "S", "name": "松原" },
  { "code": 320500, "initial": "S", "name": "苏州" },
  { "code": 321300, "initial": "S", "name": "宿迁" },
  { "code": 341300, "initial": "S", "name": "宿州" },
  { "code": 231200, "initial": "S", "name": "绥化" },
  { "code": 421300, "initial": "S", "name": "随州" },
  { "code": 510900, "initial": "S", "name": "遂宁" },
  { "code": 654200, "initial": "T", "name": "塔城" },
  { "code": 331000, "initial": "T", "name": "台州" },
  { "code": 140100, "initial": "T", "name": "太原" },
  { "code": 370900, "initial": "T", "name": "泰安" },
  { "code": 321200, "initial": "T", "name": "泰州" },
  { "code": 130200, "initial": "T", "name": "唐山" },
  { "code": 120000, "initial": "T", "name": "天津" },
  { "code": 620500, "initial": "T", "name": "天水" },
  { "code": 211200, "initial": "T", "name": "铁岭" },
  { "code": 220500, "initial": "T", "name": "通化" },
  { "code": 150500, "initial": "T", "name": "通辽" },
  { "code": 610200, "initial": "T", "name": "铜川" },
  { "code": 340700, "initial": "T", "name": "铜陵" },
  { "code": 520600, "initial": "T", "name": "铜仁" },
  { "code": 650400, "initial": "T", "name": "吐鲁番" },
  { "code": 371000, "initial": "W", "name": "威海" },
  { "code": 370700, "initial": "W", "name": "潍坊" },
  { "code": 610500, "initial": "W", "name": "渭南" },
  { "code": 330300, "initial": "W", "name": "温州" },
  { "code": 532600, "initial": "W", "name": "文山" },
  { "code": 150300, "initial": "W", "name": "乌海" },
  { "code": 150900, "initial": "W", "name": "乌兰察布" },
  { "code": 650100, "initial": "W", "name": "乌鲁木齐" },
  { "code": 320200, "initial": "W", "name": "无锡" },
  { "code": 640300, "initial": "W", "name": "吴忠" },
  { "code": 340200, "initial": "W", "name": "芜湖" },
  { "code": 450400, "initial": "W", "name": "梧州" },
  { "code": 420100, "initial": "W", "name": "武汉" },
  { "code": 620600, "initial": "W", "name": "武威" },
  { "code": 610100, "initial": "X", "name": "西安" },
  { "code": 630100, "initial": "X", "name": "西宁" },
  { "code": 532800, "initial": "X", "name": "西双版纳" },
  { "code": 152500, "initial": "X", "name": "锡林郭勒" },
  { "code": 350200, "initial": "X", "name": "厦门" },
  { "code": 421200, "initial": "X", "name": "咸宁" },
  { "code": 610400, "initial": "X", "name": "咸阳" },
  { "code": 430300, "initial": "X", "name": "湘潭" },
  { "code": 433100, "initial": "X", "name": "湘西" },
  { "code": 420600, "initial": "X", "name": "襄阳" },
  { "code": 420900, "initial": "X", "name": "孝感" },
  { "code": 140900, "initial": "X", "name": "忻州" },
  { "code": 410700, "initial": "X", "name": "新乡" },
  { "code": 360500, "initial": "X", "name": "新余" },
  { "code": 411500, "initial": "X", "name": "信阳" },
  { "code": 152200, "initial": "X", "name": "兴安" },
  { "code": 130500, "initial": "X", "name": "邢台" },
  { "code": 320300, "initial": "X", "name": "徐州" },
  { "code": 411000, "initial": "X", "name": "许昌" },
  { "code": 341800, "initial": "X", "name": "宣城" },
  { "code": 511800, "initial": "Y", "name": "雅安" },
  { "code": 370600, "initial": "Y", "name": "烟台" },
  { "code": 610600, "initial": "Y", "name": "延安" },
  { "code": 222400, "initial": "Y", "name": "延边" },
  { "code": 320900, "initial": "Y", "name": "盐城" },
  { "code": 321000, "initial": "Y", "name": "扬州" },
  { "code": 441700, "initial": "Y", "name": "阳江" },
  { "code": 140300, "initial": "Y", "name": "阳泉" },
  { "code": 230700, "initial": "Y", "name": "伊春" },
  { "code": 654000, "initial": "Y", "name": "伊犁" },
  { "code": 511500, "initial": "Y", "name": "宜宾" },
  { "code": 420500, "initial": "Y", "name": "宜昌" },
  { "code": 360900, "initial": "Y", "name": "宜春" },
  { "code": 430900, "initial": "Y", "name": "益阳" },
  { "code": 640100, "initial": "Y", "name": "银川" },
  { "code": 360600, "initial": "Y", "name": "鹰潭" },
  { "code": 210800, "initial": "Y", "name": "营口" },
  { "code": 431100, "initial": "Y", "name": "永州" },
  { "code": 610800, "initial": "Y", "name": "榆林" },
  { "code": 450900, "initial": "Y", "name": "玉林" },
  { "code": 632700, "initial": "Y", "name": "玉树" },
  { "code": 530400, "initial": "Y", "name": "玉溪" },
  { "code": 430600, "initial": "Y", "name": "岳阳" },
  { "code": 445300, "initial": "Y", "name": "云浮" },
  { "code": 140800, "initial": "Y", "name": "运城" },
  { "code": 370400, "initial": "Z", "name": "枣庄" },
  { "code": 440800, "initial": "Z", "name": "湛江" },
  { "code": 430800, "initial": "Z", "name": "张家界" },
  { "code": 130700, "initial": "Z", "name": "张家口" },
  { "code": 620700, "initial": "Z", "name": "张掖" },
  { "code": 350600, "initial": "Z", "name": "漳州" },
  { "code": 530600, "initial": "Z", "name": "昭通" },
  { "code": 441200, "initial": "Z", "name": "肇庆" },
  { "code": 321100, "initial": "Z", "name": "镇江" },
  { "code": 410100, "initial": "Z", "name": "郑州" },
  { "code": 442000, "initial": "Z", "name": "中山" },
  { "code": 640500, "initial": "Z", "name": "中卫" },
  { "code": 500000, "initial": "Z", "name": "重庆" },
  { "code": 330900, "initial": "Z", "name": "舟山" },
  { "code": 411600, "initial": "Z", "name": "周口" },
  { "code": 430200, "initial": "Z", "name": "株洲" },
  { "code": 440400, "initial": "Z", "name": "珠海" },
  { "code": 411700, "initial": "Z", "name": "驻马店" },
  { "code": 512000, "initial": "Z", "name": "资阳" },
  { "code": 370300, "initial": "Z", "name": "淄博" },
  { "code": 510300, "initial": "Z", "name": "自贡" },
  { "code": 520300, "initial": "Z", "name": "遵义" }];

// 城市首字母
var _cityInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
// 发送
function _send(url, data, method, success) {
  wx.request({
    url: 'https://api.carbycar.com.cn' + url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      success(res.data);
    }
  })
};

function _getCitys() {
  return _citys;
};
function _getCityInitials() {
  return _cityInitials;
};
function _getCityGroups() {
  var groups = [];
  for (var i = 0; i < _cityInitials.length; i++) {
    var group = {
      initial: _cityInitials[i],
      citys: []
    };

    for (var j = 0; j < _citys.length; j++) {
      var city = _citys[j];
      if (group.initial == city.initial) {
        city.json = JSON.stringify(city);
        group.citys.push(city);
      }
    }

    groups.push(group);
  }
  return groups;
}
function _getCity(code) {
  var city = null;
  for (var i = 0; i < _citys.length; i++) {
    if (_citys[i].code == code) {
      city = _citys[i].name;
      break;
    }
  }

  return city;
}


function _showToast(cate, text) {
  switch (cate) {
    case 'loading':
      wx.showToast({ title: text, icon: 'loading', duration: 2000 });
      break;
    case 'success':
      wx.showToast({ title: text, icon: 'success', duration: 2000 });
      break;
    case 'warning':
      wx.showModal({ title: '提示', content: text, showCancel: false, confirmText: '关闭' });
      break;
    case 'info':
      wx.showModal({ title: '消息', content: text, showCancel: false, confirmText: '关闭' });
      break;
    case 'error':
      wx.showModal({ title: '错误', content: text, showCancel: false, confirmText: '关闭' });
      break;
    case 'phone':
      wx.showModal({
        title: '拨号', content: '联系电话' + text, showCancel: true, confirmText: '拨号',
        success: function (res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: text
            })
          }
        }
      });
      break;
  }
}

// 格式化
function _dateFormat(dateStr, fmt) {
  var target = _dateFrom(dateStr);
  var o = {
    "M+": target.getMonth() + 1,
    "d+": target.getDate(),
    "h+": target.getHours(),
    "m+": target.getMinutes(),
    "s+": target.getSeconds(),
  };
  var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (target.getFullYear() + "").substr(4 - RegExp.$1.length));
  if (/(w|W)/g.test(fmt)) fmt = fmt.replace(RegExp.$1, week[target.getDay()]);
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
// 转换
function _dateFrom(dateStr) {
  if (dateStr instanceof Date) return dateStr;
  var myDate = null;
  switch (typeof dateStr) {
    case 'string':
      // 如果是UTC时间
      if (dateStr.indexOf('T') > -1) dateStr = dateStr.replace(/T/g, ' ').replace(/Z/g, '');
      dateStr = dateStr.replace(/-/g, '/').substring(0, 19);
      myDate = new Date(dateStr);
      break;
    case 'number':
      myDate = new Date(dateStr);
      break;
  }
  return myDate;
};
// 比较大小
function _dateDiff(strBegin, strEnd, format) {
  var begin = _dateFrom(strBegin).getTime();
  var end = _dateFrom(strEnd).getTime();
  var diff = end - begin;
  var seconds = Math.abs(diff / 1000);
  var frt = {
    'f': 1,
    's': 1000,
    'm': 1000 * 60,
    'h': 1000 * 60 * 60,
    'd': 1000 * 60 * 68 * 24
  };
  if (!format) format = 'f';
  return diff / frt[format];
};


function _getUser() {
  var app = getApp();
  if (app.globalData.user.Expires > new Date()) {
    return;
  }
  // 调用登录接口
  wx.login({
    success: function (res) {
      if (res.code) {
        _send('/wechat/takeuser', { code: res.code }, 'GET', function (wechat) {
          if (wechat.Success) {
            app.globalData.user.Code = wechat.ClientCode;
            app.globalData.user.Expires = _dateFrom(wechat.ExpiredTime);
            app.user();
          } else {
            _showToast('warning', '获取用户信息失败, 无法发送消息');
          }
        });
      }
    }
  });
};

module.exports = {
  getCity: _getCity,
  getCitys: _getCitys,
  getCityInitials: _getCityInitials,
  getCityGroups: _getCityGroups,
  send: _send,
  toast: _showToast,

  getUser: _getUser
};