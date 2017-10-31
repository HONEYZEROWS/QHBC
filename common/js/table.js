;
(
	function($) {

		$.fn.extend({

			"Table": function(divId, id, row, col, headList, content, datas) {

				var table = $("<table class='re' id=" + id + ">"),
					// 设置表头
					setHead = function() {
						for(var n = 0; n < col; n++) {
							var th = $("<th>" + headList[n] + "</th>");
							$(th).appendTo(table);
						}
					},
					setContent = function() {
						var td = new Array();
						for(var y = 0; y < row; y++) {
							var tr = $("<tr>");
							$(tr).appendTo(table);
							for(var x = 0 + (col * y); x < col * (y + 1); x++) {
								$("<td>" + "" + "</td>").appendTo(tr);

							}
							$("</tr>").appendTo(table);
							//				console.log(datas)

							// 设置序号
							for(var i = 0; i < row; i++) {
								$("#re tr:eq(" + i + ") td:eq(0)").text(i + 1);
							}
						}
						//设置内容
						for(var i = 0; i < datas.length; i++) {
							var shuju = datas[i];
							var syncTime = datas[i].syncTime;
							for(var k = 1; k <= col; k++) {
								$(".re tr:eq(" + i + ") td:eq(" + k + ")").html(shuju[k - 1]);
							}
							$("#re tr:eq(" + i + ") td:eq(9)").html(syncTime);
						}

					};

				table.appendTo($(divId));

				$("<thead>").appendTo(table);
				setHead();
				$("</thead>").appendTo(table);
				$("<tbody>").appendTo(table);
				setContent();
				$("</tbody>").appendTo(table);
				$(divId).append("</table>");

			} //table结束  
		}); //fn结束
	}(jQuery)
);