const Export = {
	getTitle(tabelName, tableData){
		var title = [`${tabelName}`]
		for(var i=0; i<tableData.length -1; i++) {
      title.push('')
    }
    return title
	},
	getLastPositonFn(data){
		return [`A1:${Export.getLastPositon(data.map(res=>res.prop))}`] //合并单元格
	},
	getLastPositon(list){
   let arr = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1"];
      return list && list.length>0 ? arr[list.length-1] : ''
	},
	formatJson(filterVal, jsonData) {
	  return jsonData.map(v => filterVal.map(j => v[j]))
	}
}
// module.exports = Export
// import toExcel from '@/excel/exportFn'
// Vue.prototype.$toExcelFn = toExcel

// import('@/excel/json2excel').then(excel => {
//   const tHeader = this.tableCol.map(res=>res.label) //表头
//   var title = [`${this.tableName}`]  //标题
//   for(var i=0; i<this.tableCol.length -1; i++) {
//     title.push('')
//   }
// //表头对应字段
//   const data = this.formatJson(this.tableCol.map(res=>res.prop), this.tableData)
//   data.map(item => {
//     item.map((i, index) => {
//       if (!i) {
//         item[index] = ''
//       }
//     })
//   })
//   const last = this.getLastPositon(this.tableCol.map(res=>res.prop))
//   const merges = [`A1:${last}`] //合并单元格
//   excel.export_json_to_excel({
//     title,
//     header: tHeader,
//     data,
//     merges,
//     filename: this.tableName,
//     autoWidth: true,
//     bookType: 'xlsx'
//   })
// })