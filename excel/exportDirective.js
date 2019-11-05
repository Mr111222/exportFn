import Vue from 'vue'
export default Vue.directive('exports', {
  update(el, binding){
  	el.onclick = function () {
  		const {datas, label,tableName} = binding.value
  		import('@/excel/json2excel').then(excel => {
			  const tHeader = label.map(res=>res.label) //表头
			  var title = [`${tableName}`]  //标题
			  for(var i=0; i<label.length -1; i++) {
			    title.push('')
			  }
			//表头对应字段
			  const data = formatJson(label.map(res=>res.prop), datas)
			  data.map(item => {
			    item.map((i, index) => {
			      if (!i) {
			        item[index] = ''
			      }
			    })
			  })
			  const last = getLastPositon(label.map(res=>res.prop))
			  const merges = [`A1:${last}`] //合并单元格
			  excel.export_json_to_excel({
			    title,
			    header: tHeader,
			    data,
			    merges,
			    filename: tableName,
			    autoWidth: true,
			    bookType: 'xlsx'
			  })
			})
  	}
  }
})


function getLastPositon(list){
 	let arr = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1"];
    return list && list.length>0 ? arr[list.length-1] : ''
}
function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}