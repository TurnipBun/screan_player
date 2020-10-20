Highcharts.theme = {
   colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
   chart: {
      backgroundColor: {
         linearGradient: [0, 0, 500, 500],
         stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(240, 240, 255)']
         ]
      },
      borderWidth: 2,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1
   },
   title: {
      style: {
         color: '#000',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   xAxis: {
      gridLineWidth: 1,
      lineColor: '#000',
      tickColor: '#000',
      labels: {
         style: {
            color: '#000',
            font: '11px Trebuchet MS, Verdana, sans-serif'
         }
      },
      title: {
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

         }
      }
   },
   yAxis: {
      minorTickInterval: 'auto',
      lineColor: '#000',
      lineWidth: 1,
      tickWidth: 1,
      tickColor: '#000',
      labels: {
         style: {
            color: '#000',
            font: '11px Trebuchet MS, Verdana, sans-serif'
         }
      },
      title: {
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
         }
      }
   },
   legend: {
      itemStyle: {
         font: '9pt Trebuchet MS, Verdana, sans-serif',
         color: 'black'

      },
      itemHoverStyle: {
         color: '#039'
      },
      itemHiddenStyle: {
         color: 'gray'
      }
   },
   labels: {
      style: {
         color: '#99b'
      }
   }
};

var chart;

(function($){
	$.fn.tideLineChart = function(params){
		  params = params || {};
		  chart = new Highcharts.Chart({
				chart: {
					renderTo: params.id || 'container',
					type: 'line',
					marginRight: 20,
					marginBottom: 40
				},
				title: {
					text: params.title || '',
					x: -20 //center
				},
				xAxis: {
					title: {
						text: 'Tidal Hour (Hrs)<br/><br/>'
					},
					labels: {
					overflow: 'justify',
		                formatter: function() {
		                	var d = new Date(this.value);
		                    return d.getHours() + ":" + d.getMinutes();
		                }
		            }
					,
					showLastLabel: true
				},
				yAxis: {
					title: {
						text: 'Tidal Level (CM)'
					}
				},
				tooltip: {
					formatter: function() {
						var d = new Date(this.x);
						return '<b>'+ this.series.name +'</b><br/>'+ d.getHours() + ":" + d.getMinutes() + " " + this.y +'CM';
					}
				},
				legend: {
					enabled: false
				},
				series: params.data || []
			});
		return $(this);
	};
	$.fn.tideHLChart = function(params){
		  params = params || {};
		  chart = new Highcharts.Chart({
				chart: {
					renderTo: params.id || 'container',
					type: 'line'
				},
				title: {
					text: params.title || '',
					x: -20 //center
				},
				xAxis: {
					title: ''
//					{
//						text: '潮时（Hrs）<br/>',
//						style: {
//							color: '#3479B2',
//							fontSize: '12px',
//							fontWeight: 'lighter',
//							fontFamily: '宋体'
//						}
//					}
					,
		            endOnTick: true,
		            startOnTick: true,
		            //tickPixelInterval: 50,
					tickInterval: 6 * 60 * 60 * 1000,
					tickWidth: 0,
					gridLineWidth: 1,
					showFirstLabel: false,
					labels: {
					overflow: 'justify',
		                formatter: function() {
		                	var d = new Date(this.value);
							if ( Number(d.getHours()) < 10) {hh = '0'+Number(d.getHours()) ;} else { hh = Number(d.getHours()) ;}
							if ( Number(d.getMinutes()) < 10) {mm = '0'+Number(d.getMinutes()) ;} else { mm = Number(d.getMinutes()) ;}
		                    return hh + ":" + mm;
		                }
		            }

				},
				yAxis: {
					title: '' /*{
						text: '潮高（cm）',
						style: {
							color: '#3479B2',
							fontSize: '12px',
							fontWeight: 'lighter',
							fontFamily: '宋体'
						}
					}*/,
					tickPixelInterval: 30
				},
				tooltip: {
					formatter: function() {
						var d = new Date(this.x);
						if ( Number(d.getHours()) < 10) {hh = '0'+Number(d.getHours()) ;} else { hh = Number(d.getHours()) ;}
						if ( Number(d.getMinutes()) < 10) {mm = '0'+Number(d.getMinutes()) ;} else { mm = Number(d.getMinutes()) ;}
						return '<b>'+ this.series.name +'</b><br/><b>'+  hh + ":" + mm + "</b> " + this.y +'CM';
					},
					crosshairs: [{
						width: 1,
						color: '#3479B2'
					}, {
						width: 1,
						color: '#3479B2'
					}]
				},
				plotOptions: {
					spline: {
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 5
							}
						},
						marker: {
							enabled: false,
							states: {
								hover: {
									enabled: true,
									symbol: 'circle',
									radius: 5,
									lineWidth: 1
								}
							}
						}
					}
				},
				legend: {
					enabled: false
				},
				series: params.data || []
			});
		return $(this);
	};
	$.fn.tideSimpleChart = function(params){
		  params = params || {};
		  chart = new Highcharts.Chart({
				chart: {
					renderTo: params.id || 'container',
					type: 'line'
				},
				title: {
					text: params.title || '',
					x: -20 //center
				},
				xAxis: {
                	type: 'datetime',
					title: {
						text: '潮 时（Hrs）',
						style: {
							color: '#3479B2',
							fontSize: '16px',
							fontWeight: 'lighter',
							fontFamily: '宋体'
						}
					},
		            endOnTick: true,
		            startOnTick: true,
		            //tickPixelInterval: 50,
					tickInterval: 2 * 60 * 60 * 1000,
					tickWidth: 0,
					gridLineWidth: 1,
					showFirstLabel: false,
					labels: {
					overflow: 'justify',
		                formatter: function() {
		                	var d = new Date(this.value);
							if ( Number(d.getHours()) < 10) {hh = '0'+Number(d.getHours()) ;} else { hh = Number(d.getHours()) ;}
							if ( Number(d.getMinutes()) < 10) {mm = '0'+Number(d.getMinutes()) ;} else { mm = Number(d.getMinutes()) ;}
		                    return hh + ":" + mm;
		                }
		            }

				},
				yAxis: {
					title: {
						text: '潮 高（cm）',
						style: {
							color: '#3479B2',
							fontSize: '16px',
							fontWeight: 'lighter',
							fontFamily: '宋体'
						}
					},
					tickPixelInterval: 30
				},
				tooltip: {
					formatter: function() {
						var d = new Date(this.x);
						if ( Number(d.getHours()) < 10) {hh = '0'+Number(d.getHours()) ;} else { hh = Number(d.getHours()) ;}
						if ( Number(d.getMinutes()) < 10) {mm = '0'+Number(d.getMinutes()) ;} else { mm = Number(d.getMinutes()) ;}
						return '<b>'+ this.series.name +'</b><br/><b>'+  hh + ":" + mm + "</b> " + this.y +'CM';
					},
					crosshairs: [{
						width: 1,
						color: '#3479B2'
					}, {
						width: 1,
						color: '#3479B2'
					}]
				},
				legend: {
					enabled: false
				},
				series: params.data || []
			});
		return $(this);
	};
	$.fn.bdiSimpleChartWithTitle = function(params){
		  params = params || {};
		  chart = new Highcharts.Chart({
				chart: {
					renderTo: params.id || 'container',
					type: 'line',
					height: 145,
					width: 310,
					style: {margin: '0px auto'}
				},
				title: {
					text: params.title || ''
				},
				xAxis: {
					endOnTick: true,
		            startOnTick: true,
		            tickPixelInterval: 70,
					labels: {
					overflow: 'justify',
		                formatter: function() {
		                	var d = new Date(this.value);
		                    return (d.getMonth() + 1) + "." + d.getDate() + "";
		                }
		            }
				},
				yAxis: {
					title: {
						text: ''
					},
					tickPixelInterval: 30
				},
				tooltip: {
					formatter: function() {
						var d = new Date(this.x);
						return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
					}
				},
				legend: {
					enabled: false
				},
				series: params.data || []
			});
		return $(this);
	};
	$.fn.bdiSimpleChart = function(params){
		  params = params || {};
		  chart = new Highcharts.Chart({
				chart: {
					renderTo: params.id || 'container',
					defaultSeriesType: 'line',
		            margin: [10, 30, 40, 45]
				},
				title: {
					text: null
				},
				xAxis: {
					endOnTick: true,
		            startOnTick: true,
		            tickPixelInterval: 70,
					labels: {
					overflow: 'justify',
		                formatter: function() {
		                	var d = new Date(this.value);
		                    return (d.getMonth() + 1) + "." + d.getDate() + "";
		                }
		            }
				},
				yAxis: {
					title: {
						text: ''
					},
					tickPixelInterval: 30
				},
				tooltip: {
					formatter: function() {
						var d = new Date(this.x);
						return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
					}
				},
				legend: {
					enabled: false
				},
				series: params.data || []
			});
		return $(this);
	};
	$.fn.bdiWeekChart = function(params)
	{
		params = params || {};
		//指定y轴坐标名称
		if(!params['title'] || !params['title']['text'] || params['title']['text'] == ''){
			params['title'] = {text:'周走势'};
		}
		chart = new Highcharts.Chart({
			chart: {
				renderTo: params.id || 'chartWeek' ,
				//defaultSeriesType: 'line',
				type: 'line',
				height: params.height || 245,
				width: params.width || 310,
				style: {margin: '0px auto'}
			},

			title: {
				text: params['title']['text'] ,
				align: 'left',
				style: {
					color: '#C11920',
					fontSize: '12px',
					fontWeight: 'bold'
				}
			},

			xAxis: {
				endOnTick: true,
	            startOnTick: true,
				//type: 'datetime',
				tickInterval: this.x,
	            //tickPixelInterval: 50,
				categories: params.categories,
				labels: {
					//overflow: 'justify',
					//align: 'left',
					y: 12
	                //formatter: function() {
//	                	var d = new Date(this.value);
//	                    return (d.getMonth() + 1) + "." + d.getDate() + "";
//	                }
	            }
			},

			yAxis: [{
				tickInterval: this.y,
				title: {
					text: null
				},
				labels: {
					align: 'left',
					//x: -10,
					y: 16,
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					}
				},
				showFirstLabel: false
			}, {
				tickInterval: this.y,
				linkedTo: 0,
				gridLineWidth: 0,
				opposite: true,
				title: {
					text: null
				},
				labels: {
					align: 'right',
					//x: 10,
					y: 16,
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					}
				},
				showFirstLabel: false
			}],
			
			legend: {
				enabled:false
			},
			
			credits: {
				enabled:false
			},

			tooltip: {
				//labels: {
				//	align: 'center'
				//},
				formatter: function() {
					//var d = new Date(this.x);
					//return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
					var d = this.x.split(".");
					return '<b>'+ d[0] + "月" + d[1] + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
				}
			},

			series: params.data || []
		});
	}
	$.fn.sspiShipChart = function(params)
	{
		  params = params || {};
		  Highcharts.setOptions(Highcharts.theme);
		  chart = new Highcharts.Chart({
				chart: {
					renderTo: params.id || 'container',
					defaultSeriesType: 'line'
				},
				title: {
					text: params.title || ''
				},
				subtitle: {
		            text: params.date + ': ' + params.ship_index + ''
		        },
				xAxis: {
					endOnTick: true,
		            startOnTick: true,
		            tickPixelInterval: params.showYear ? 80 : 70,
					labels: {
					overflow: 'justify',
		                formatter: function() {
		                	var d = new Date(this.value);
		                	if(params.showYear)
		                	{
		                		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
		                	}
		                	else
		                	{
		                		return (d.getMonth() + 1) + "月" + d.getDate() + "日";
		                	}
		                }
		            }
				},
				yAxis: {
					title: {
						text: ''
					},
					tickPixelInterval: 30
				},
				tooltip: {
					formatter: function() {
						var d = new Date(this.x);
						return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
					}
				},
				legend: {
					enabled: false
				},
				series: params.data || []
			});
		return $(this);
	};
	$.fn.bdiBigChart = function(params){
		params = params || {};
		chart = new Highcharts.Chart({
			chart: {
				renderTo: params.id || 'container',
				defaultSeriesType: 'area',
				plotBackgroundImage: '/r/cms/www/cnss/images/cnss/exponent/tlogoBig3.png',
				width: 600,
				style: {margin: '0px auto'}
			},
			title: {
				text: params.title || '波罗的海干散货指数'
			},
			xAxis: {
				type: 'datetime',
				//tickInterval: this.x,
				tickPixelInterval: 100,
				//tickWidth: 0,
				gridLineWidth: 1,
//				showFirstLabel: true,
//            	showLastLabel: true,
//				endOnTick: true,
//            	startOnTick: true,
				max:  params.dateMax,
				min:  params.dateMin,
				//categories:  params.dates ,
				labels: {
					rotation: ((params.data[0].data.length <30 || params.data[0].data.length) > 10 ) ? 0 : -45,
					y: ((params.data[0].data.length <30 || params.data[0].data.length) > 10 ) ? 12 : 22,
					overflow: 'justify',
					//step: 6 //,
					formatter: function() {
	                	var d = new Date(this.value);
						return Highcharts.dateFormat('%m月%d日', this.value); 
//	                	if(params.showYear)
//	                	{
//	                		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
//	                	}
//	                	else
//	                	{
//	                		return (d.getMonth() + 1) + "月" + d.getDate() + "日";
//	                	}
	                }
				}
			},
			yAxis: [{
					title: {
						text: null
					},
					labels: {
						align: 'left',
						//x: -10,
						//y: 16,
						formatter: function() {
							return Highcharts.numberFormat(this.value, 0);
						}
					},
					showFirstLabel: false
				}, {
					linkedTo: 0,
					opposite: true,
					title: {
						text: null
					},
					labels: {
						align: 'right',
						//x: 10,
						//y: 16,
						formatter: function() {
							return Highcharts.numberFormat(this.value, 0);
						}
					},
					showFirstLabel: false
				}
			],

			tooltip: {
				formatter: function() {
					var d = new Date(this.x);
					return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
					//return '<b>'+ this.x +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
				}
			},
			legend: {
				enabled: false
			},
			exporting: {
				buttons: {
					exportButton: {enabled: false}
				}
			},
			series: params.data || []
		});
		return $(this);
	};
	$.fn.ccfiBigChart = function(params){
		params = params || {};
		Highcharts.theme.chart.borderColor = '#C11920';
		Highcharts.setOptions(Highcharts.theme);
		chart = new Highcharts.Chart({
			chart: {
				renderTo: params.id || 'container',
				defaultSeriesType: 'area'
			},
			title: {
				text: params.title || '中国出口集装箱运价指数'
			},
			xAxis: {
				labels: {
					overflow: 'justify',
					formatter: function () {
						return Highcharts.dateFormat('%Y-%m-%d', this.value);
					}
				}
		    },
			yAxis: {
				title: {
			          text: ''
			    },
			    labels: {
			    	formatter: function () {
			            return this.value;
			        }
			    }
			},
			tooltip: {
				formatter: function() {
					var d = new Date(this.x);
					return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				area: {
					pointInterval: 10,
			        marker: {
			          enabled: false,
			          symbol: 'circle',
			          radius: 2,
			          states: {
			            hover: {
			              enabled: true
			            }
			          }
			        }
				}
			},
			exporting: {
				buttons: {
					exportButton: {enabled: false}
				}
			},
			series: params.data || []
		});
		return $(this);
	};
	$.fn.gtBigChart = function(params){
		params = params || {};
		chart = new Highcharts.Chart({
			chart: {
				renderTo: params.id || 'container',
				defaultSeriesType: 'area',
				width: 600,
				style: {margin: '0px auto'}
			},
			title: {
				text: params.title || '钢铁指数'
			},
			xAxis: {
				type: 'datetime',
				tickInterval: this.x,
				tickWidth: 0,
				gridLineWidth: 1,
				labels: {
					overflow: 'justify',
					align: 'left',
					x: 3,
					y: 20,
					formatter: function() {
	                	var d = new Date(this.value);
	                	if(params.showYear)
	                	{
	                		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	                	}
	                	else
	                	{
	                		return (d.getMonth() + 1) + "月" + d.getDate() + "日";
	                	}
	                }
				}
			},
			yAxis: [{
					title: {
						text: null
					},
					labels: {
						align: 'left',
						x: -10,
						y: 16,
						formatter: function () {
							return this.value;
						}
					},
					min: params.Min,
					max: params.Max,
					showFirstLabel: false
				}, {
					linkedTo: 0,
					gridLineWidth: 0,
					opposite: true,
					title: {
						text: null
					},
					labels: {
						align: 'right',
						x: 10,
						y: 16,
						formatter: function () {
							return this.value;
						}
					},
					min: params.Min,
					max: params.Max,
					showFirstLabel: false
				}
			],

			tooltip: {
				formatter: function() {
					var d = new Date(this.x);
					return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' +  parseFloat(this.y).toFixed(2);
				}
			},
			legend: {
				enabled: false
			},
			exporting: {
				buttons: {
					exportButton: {enabled: false}
				}
			},
			series: params.data || []
		});
		return $(this);
	};
	$.fn.bdiBigChartForVV = function(params){
		params = params || {};
		chart = new Highcharts.Chart({
			chart: {
				renderTo: params.id || 'container',
				defaultSeriesType: 'area',
				plotBackgroundImage: '/r/cms/www/cnss/images/cnss/exponent/tlogoBig2.png',
				width: 600,
				style: {margin: '0px auto'}
			},
			title: {
				text: params.title || '波罗的海干散货指数'
			},
			xAxis: {
				type: 'datetime',
				//tickInterval: this.x,
				tickPixelInterval: 100,
				//tickWidth: 0,
				gridLineWidth: 1,
//				showFirstLabel: true,
//            	showLastLabel: true,
//				endOnTick: true,
//            	startOnTick: true,
				max:  params.dateMax,
				min:  params.dateMin,
				//categories:  params.dates ,
				labels: {
					rotation: ((params.data[0].data.length <30 || params.data[0].data.length) > 10 ) ? 0 : -45,
					y: ((params.data[0].data.length <30 || params.data[0].data.length) > 10 ) ? 12 : 22,
					overflow: 'justify',
					//step: 6 //,
					formatter: function() {
						var d = new Date(this.value);
						return Highcharts.dateFormat('%m月%d日', this.value);
//	                	if(params.showYear)
//	                	{
//	                		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
//	                	}
//	                	else
//	                	{
//	                		return (d.getMonth() + 1) + "月" + d.getDate() + "日";
//	                	}
					}
				}
			},
			yAxis: [{
				title: {
					text: null
				},
				labels: {
					align: 'left',
					//x: -10,
					//y: 16,
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					}
				},
				showFirstLabel: false
			}, {
				linkedTo: 0,
				opposite: true,
				title: {
					text: null
				},
				labels: {
					align: 'right',
					//x: 10,
					//y: 16,
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					}
				},
				showFirstLabel: false
			}
			],

			tooltip: {
				formatter: function() {
					var d = new Date(this.x);
					return '<b>'+ d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
					//return '<b>'+ this.x +'</b><br/><b>'+ this.series.name +'</b>:' + this.y;
				}
			},
			legend: {
				enabled: false
			},
			exporting: {
				buttons: {
					exportButton: {enabled: false}
				}
			},
			series: params.data || []
		});
		return $(this);
	};
	
})(jQuery);


//[["2011\/12\/10",1137.41],["2011\/12\/17",1134.74],["2011\/12\/24",1139.21],["2011\/12\/31",1140.96],["2012\/01\/07",1135.83],["2012\/01\/14",1123.66],["2012\/01\/21",1103.37],["2012\/02\/04",1097.57],["2012\/02\/11",1096.63],["2012\/02\/18",1118.28],["2012\/02\/25",1140.38],["2012\/03\/03",1158.92],["2012\/03\/10",1184.18],["2012\/03\/17",1223.52],["2012\/03\/24",1249.6],["2012\/03\/31",1242.87],["2012\/04\/07",1206.59],["2012\/04\/14",1185.11],["2012\/04\/21",1168.19],["2012\/04\/28",1155.71],["2012\/05\/05",1144.62],["2012\/05\/12",1122.66],["2012\/05\/19",1104.58],["2012\/05\/26",1090.05]]