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
    let arr = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1","AA1", "AB1", "AC1", "AD1", "AE1", "AF1", "AG1", "AH1", "AI1", "AJ1", "AK1", "AL1", "AM1", "AN1", "AO1", "AP1", "AQ1", "AR1", "AS1", "AT1", "AU1", "AV1", "AW1", "AX1", "AY1", "AZ1","BA1", "BB1", "BC1", "BD1", "BE1", "BF1", "BG1", "BH1", "BI1", "BJ1", "BK1", "BL1", "BM1", "BN1", "BO1", "BP1", "BQ1", "BR1", "BS1", "BT1", "BU1", "BV1", "BW1", "BX1", "BY1", "BZ1","CA1", "CB1", "CC1", "CD1", "CE1", "CF1", "CG1", "CH1", "CI1", "CJ1", "CK1", "CL1", "CM1", "CN1", "CO1", "CP1", "CQ1", "CR1", "CS1", "CT1", "CU1", "CV1", "CW1", "CX1", "CY1", "CZ1","DA1", "DB1", "DC1", "DD1", "DE1", "DF1", "DG1", "DH1", "DI1", "DJ1", "DK1", "DL1", "DM1", "DN1", "DO1", "DP1", "DQ1", "DR1", "DS1", "DT1", "DU1", "DV1", "DW1", "DX1", "DY1", "DZ1"];
    return list && list.length>0 ? arr[list.length-1] : ''
}
function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
