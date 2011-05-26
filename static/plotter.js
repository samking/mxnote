var chart1;
var nextVal = 0;
var nextId = 0;
var tracksMap = {};
var curScheme = '';
var colors = {
  'prob' : '#FF0000',
  'lab'  : '#3388FF',
  'med'  : '#F7A700 '
}

var DATA_COOKIE_PREFIX = 'data_cookie_';

//saves the provided key, value pair into a cookie that won't ever expire
function saveCookie(key, value) {
  var valJson = JSON.stringify(value);
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 365*10); //expire 10 years from now
  document.cookie = key + '=' + valJson + '; expires=' + 
                    expireDate.toUTCString() + '; path=/';
}

//Saves everything inside of data to a cookie that won't ever expire
function saveDataToCookie() {
  var notes = {};
  for (var track in tracksMap) {
    if (tracksMap[track].notes.length > 0) {
      notes[track] = tracksMap[track];
    }
  }
  saveCookie(DATA_COOKIE_PREFIX + SMART.record.id, notes);
}

//returns the value associated with the named cookie
//from http://www.quirksmode.org/js/cookies.html
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

//Loads everything inside the cookie to data
function loadDataFromCookie() {
  var cookieTracks = readCookie(DATA_COOKIE_PREFIX + SMART.record.id);
  if (cookieTracks == null) return;
  cookieTracks = JSON.parse(cookieTracks);
  for (var trackName in cookieTracks) {
    var track  = cookieTracks[trackName];
    //copies the current track from the cookie
    addDataPoint(trackName, track.events[0].description, 
                 track.events[0].startTime, track.events[0].endTime, 
                 track.type);
    //copies and displays each note into the current track
    track = tracksMap[trackName];
    track.notes = cookieTracks[trackName].notes;
    for (var noteId in track.notes) {
      var note = track.notes[noteId];
      var series = chart1.series[track.id];
      series.addPoint({x: note.date, y: series.data[0].y, marker: {symbol: 'url(../static/img/note.png)'}});
    }
  }
}

//returns a string containing all user notes formatted to output in HTML
function generateTextToExport () {
  var text = "";
  var LINE_DELIMITER = "<br />\n";
  for (var trackName in tracksMap) {
    var track = tracksMap[trackName];
    for (var noteId in track.notes) {
      var note = track.notes[noteId];
      text += "Track Name: " + track.name + LINE_DELIMITER + 
              "Track Type: " + track.type + LINE_DELIMITER + 
              "Date: " + Highcharts.dateFormat('%B %e, %Y', note.date) + LINE_DELIMITER +
              "Time: " + Highcharts.dateFormat('%H:%M', note.date) + LINE_DELIMITER + 
              "Description: " + note.description + LINE_DELIMITER + 
              LINE_DELIMITER;
    }
  }
  return text;
}

function addDataPoint(trackName, description, startTime, endTime, type) {
  var track = tracksMap[trackName];
  if (track == undefined) {
    tracksMap[trackName] = {
      'name'   : trackName,
      'type'   : type,
      'events' : [],
      'notes'  : [],
      'id'     : nextId++,
      'yVal'   : nextVal
    };
    chart1.addSeries({name: trackName, data:[], showInLegend: false, visible: false, color: colors[type], stickyTracking: false});
    track = tracksMap[trackName];
  }
  var addEvent = true;
  for (var currEvent in track.events) {
    if (currEvent.description == description) addEvent = false;
  }

  if (addEvent) {
    track['events'].push ({
        'description' : description,
        'startTime'   : startTime,
        'endTime'     : endTime,
    });
  }

  chart1.series[track.id].addPoint({x: startTime, y: track.yVal, marker: {symbol: 'circle'}}); 
  chart1.series[track.id].addPoint({x: endTime, y: track.yVal, marker: {symbol: 'circle'}});
}
  
//returns the named property from a note if the note exists
function getNotesProperty(series, x, property) {
  var track = tracksMap[series.name];
  var notes = track.notes;
  for (var i = 0; i < notes.length; i++) {
    if (notes[i]['date'] == x) 
      return notes[i][property];
  }
  return null;
}

function getNotesText(series, x) {
  return getNotesProperty(series, x, 'description');
}

function getDescription(series, x) {
  var track = tracksMap[series.name];
  var events = track.events;
  for (var i = 0; i < events.length; i++) {
    // TODO: What if the same series has an event starting and another ending at the same time? 
    if (events[i].startTime == x || events[i].endTime == x) 
      return events[i].description;
  }

  return getNotesText(series, x);
}

function countVisible() {
  var count = 0;
  for (var i = 0; i < chart1.series.length; i++)
    if (chart1.series[i].visible) count++;
  return count;
}

function dateToTime(onset) {
  /* assume it's yyyy-mm-dd */
  var str = String(onset);
  var idx = str.search('-');
  var year = str.substring(0, idx);
  str = str.substring(idx + 1);
  idx = str.search('-');
  var month = str.substring(0, idx);
  var day = str.substring(idx + 1);
  
  return Date.UTC(parseInt(year), parseInt(month), parseInt(day), 0, 0, 0);
}

function resizeChart() {
  var count = countVisible();
  if (count <= 10) {
    height = 620;
  } else {
    height = count * 62;
  }
  $('#chart-container-1').css('height', String(height) + 'px');
  chart1.setSize(window.innerWidth, height);
}

function switchScheme(scheme) {
  if (scheme == curScheme) return;
  curScheme = scheme;
  
  $('#scheme-status').css('visibility', 'visible');
  $.getScript("../static/scheme.js", function() {
    var numToShow = 0;
    for (trackName in tracksMap) {
      var seriesId = tracksMap[trackName].id;
      if (isInDiseaseScheme(trackName, scheme)) {
        numToShow ++;
        series = chart1.series[seriesId];
        if (!series.visible) {
          series.show();
          series.options.showInLegend = true;
        }
      } else {
        series = chart1.series[seriesId];
        if (series.visible) {
          series.hide();
          //series.options.showInLegend = false;
        }
      }
    }
    if (numToShow == 0) {
        $('#no-items-msg').html('No items to display.');
        $('#show-no-items').css('display', 'inline');
      } else {
        $('#show-no-items').css('display', 'none');
      }
    chart1.isDirtyLegend = true;
    $('#scheme-status').css('visibility', 'hidden');
    setTimeout(function() {
      resizeChart();
      chart1.redraw();
    }, 300);
  });
  
  var schemes = ['Cardio', 'T2d', 'Mental'];
  for (i in schemes) {
    var s = schemes[i];
    if (s == scheme) {
      $('#' + s + '-button').attr('src', '../static/img/' + s + '_button_active.png');
    } else {
      $('#' + s + '-button').attr('src', '../static/img/' + s + '_button.png');
    }
  }
}

$(document).ready(function() {
  function addLineBreaks(str) {
  	var words = String(str).split(' ');
  	var retValue = "";
    var totWords = words.length;
  	while (words.length > 0) {
  	  var line = "";
  	  while (line.length < 15 && words.length > 0) {
  	  	line += words.shift() + " ";
  	  }
  	  retValue += line + "<br/>";
  	}
  	return retValue;
  }
  
  function createDialog(track, series, xVal) {
    $('#date').text(Highcharts.dateFormat('Date: %B %e, %Y', xVal));
    $('#time').text(Highcharts.dateFormat('Time: %H:%M', xVal));
    var desc = getNotesText(series, xVal);
    // Do not open a dialog if we click an event
    if (desc == null && getDescription(series, xVal) != null) return;
    $( '#textOfNote' ).val(desc);
    var type = getNotesProperty(series, xVal, 'type');
    $( '#typeOfNote' ).val(type);
    var buttons = [
      { 
        text: 'Save Note',
        click: function() {
          if ($('#textOfNote').val() == '') {
            return;
          }
          if (desc === null) {
            track.notes.push( {
              'date'        : xVal,
              'description' : $('#textOfNote').val(),
              'type'        : $('#typeOfNote').val()
            });
            series.addPoint({x: xVal, y: series.data[0].y, marker: {symbol: 'url(../static/img/note.png)'}});
          } else {
            for (var idx = 0; idx < track.notes.length; idx++) {
              if (track.notes[idx].date == xVal) {
                track.notes[idx].description = $('#textOfNote').val();
                break;
              }
            }
          }
          saveDataToCookie();
          $( this ).dialog( 'close' );
        }
      },
      {
        text: 'Cancel',
        click: function() {
          $( this ).dialog( 'close' );
        }
      },
    ];
      
    if (desc != null) {
      buttons.splice(1, 0,
        {
          text: "Delete", 
          click: function() {
            for (var i = 0; i < track.notes.length; i++) {
              if (track.notes[i].date == xVal) {
                track.notes.splice(i, 1);
                break;
              }
            }
            for (var i = 0; i < series.data.length; i++) {
              if (series.data[i].x == xVal) {
                series.data[i].remove();
                break;
              }
            }
            saveDataToCookie();
            $ ( this ).dialog ( 'close' );
          }
        });
    }
    $( '#dialog' ).dialog({
      autoOpen: false,
      height: 400,
      width: 430,
      modal: true,
      title: track.name + (desc === null ? ': New Note' : ': Edit Note'),
      buttons: buttons,
      close: function() {
      }
    });
    $( "#dialog" ).dialog('open');
  }
  
  chart1 = new Highcharts.Chart({
    chart: {
      renderTo: 'chart-container-1',
      defaultSeriesType: 'scatter',
      zoomType: 'x',
      events: {
        click: function(e) {
            // prevent Chrome from interpreting a click on reset zoom as a click on the graph
            if (e.srcElement != undefined && e.srcElement.nodeName == "tspan") return;
            var x = e.xAxis[0].value;
            var y = e.yAxis[0].value;
            
            var minDist = 0;
            var minKey = '';
            for (key in tracksMap) {
              if (this.series[tracksMap[key].id].visible) {
                var dist = Math.abs(tracksMap[key].yVal - y);
                if (minKey == '' || dist < minDist) {
                  minKey = key;
                  minDist = dist;
                }
              }
            }
            var track = tracksMap[minKey];
            var series = this.series[tracksMap[minKey].id];
            createDialog(track, series, e.xAxis[0].value);
        }
      }
    },
    title: {
      text: SMART.record.full_name + ' - ' + SMART.record.id
    },
    subtitle: {
      text: 'MyNote'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // always display full date
        hour: '%b %e %H:%M'
      },
      maxZoom: 3600000, // one hour
      maxPadding: .4,
      minPadding: .4,
      labels: {
        rotation: -90,
        y: 25
      }
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function() {
          for (key in tracksMap) {
            if (chart1.series[tracksMap[key].id].visible && tracksMap[key].yVal == this.value)
              return key;
          }
          return '';
        }
      },
      tickInterval: 1
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      borderWidth: 0,
      reversed: true,
    },
    plotOptions: {
      series: {
        lineWidth: 5,
        events: {
          show: function() {
            var yVal = tracksMap[this.name].yVal;
            for (key in tracksMap) {
              if (key != this.name && tracksMap[key].yVal >= yVal) {
                tracksMap[key].yVal++;
                var data = chart1.series[tracksMap[key].id].data;
                for (var i = 0; i < data.length; i++) {
                  data[i].y = data[i].y + 1;
                }
              }
            }
          },
          
          hide: function() {
            var yVal = tracksMap[this.name].yVal;
            for (key in tracksMap) {
              if (tracksMap[key].yVal > yVal) {
                tracksMap[key].yVal--;
                var data = chart1.series[tracksMap[key].id].data;
                for (var i = 0; i < data.length; i++) {
                  data[i].y = data[i].y - 1;
                }
              }
            }
          }
        },
        point: {
          events: {
            click: function() {
              createDialog(tracksMap[this.series.name], this.series, this.x);
            }
          }
        },
        marker: {
          symbol: 'circle'
        }
      },
    },
    tooltip: {
      formatter: function() {
        return '<b>' + Highcharts.dateFormat('%Y %B %e', this.x) + '</b><br/>' + getDescription(this.series, this.x) + "<br/>" + this.y;
      }
    },
    series: [],
  });
 
  loadDataFromCookie();
  
  function sanitize (str) {
    if (str.substring(0, 1) == '"' && str.substring(str.length - 1) == '"')
      return str.substring(1, str.length - 2);
    return str;
  }
  
  function cmpDataPts(a, b) {
    return a.start - b.start;
  }
  
  SMART.PROBLEMS_get(function (probs)
  {
    $('#status').html('Fetching patient problems...');
    var problems = probs.where("?problem rdf:type sp:Problem")
    .where("?problem sp:problemName ?problem_name_code")
    .where("?problem_name_code dcterms:title ?probname")
    .where("?problem sp:onset ?onset");

    var dataPoints = [];
    problems.each(function(i, val)
    {
      var onsetDate = String(val.onset);
      var xVal = dateToTime(sanitize(onsetDate));
      dataPoints.push( {
        'name': addLineBreaks(val.probname.value), 
        'desc': val.probname.value, 
        'start': xVal, 
        'end': xVal + Math.random() * 365 * 24 * 3600 * 1000, 
        'type': 'prob'
      });
    });
    
    dataPoints.sort(cmpDataPts);
    
    for (var i = 0; i < dataPoints.length; i++) {
      var pt = dataPoints[i];
      addDataPoint(pt.name, pt.desc, pt.start, pt.end, pt.type);
    }
  });
  
  SMART.MEDS_get(function (meds)
  {
    $('#status').html('Fetching patient medications...');
    var med_names = meds.where("?medication rdf:type sp:Medication")
    .where("?medication sp:drugName ?drug_name_code")
    .where("?drug_name_code dcterms:title ?drugname")
    .where("?medication sp:startDate ?start")
    .where("?medication sp:instructions ?instruct")
    .where("?medication sp:quantity ?quantity")
    .where("?quantity sp:value ?qval")
    .where("?quantity sp:unit ?qUnit")
    .where("?medication sp:frequency ?freq")
    .where("?freq sp:value ?freq_val")
    .where("?freq sp:unit ?freq_unit");

    var dataPoints = [];
    med_names.each(function(i, single)
    {
      var xVal = dateToTime(single.start.value);
      var end = xVal + Math.random() * 365 * 24 * 3600 * 1000;
      dataPoints.push( {
        'name' : addLineBreaks(sanitize(single.drugname.value)),
        'desc' : single.drugname + "<br/>" + single.instruct + "<br/>" + single.qval + " " + single.qUnit + "<br/>" + single.freq_val + " " + single.freq_unit,
        'start': xVal,
        'end'  : end,
        'type' : 'med'
      });
    });

    dataPoints.sort(cmpDataPts);
    for (var i = 0; i < dataPoints.length; i++) {
      var pt = dataPoints[i];
      addDataPoint(pt.name, pt.desc, pt.start, pt.end, pt.type);
    }
  });
   
  SMART.LAB_RESULTS_get(function (labResult)
  {
    $('#status').html('Fetching patient lab results...');
    var lab_results = labResult.where("?lab rdf:type sp:LabResult")
                     .where("?lab sp:labName ?lab_name")
                     .where("?lab_name dcterms:title ?labTitle")
                     .where ("?lab sp:quantitativeResult ?qr")
                     .where("?qr rdf:type sp:QuantitativeResult")
                     .where("?qr sp:normalRange ?nr")
                     .where("?nr sp:minimum ?normalMin")
                     .where("?normalMin sp:value ?normalMinValue")
                     .where("?normalMin sp:unit ?normalMinUnit")
                     .where("?nr sp:maximum ?normalMax")
                     .where("?normalMax sp:value ?normalMaxValue")
                     .where("?normalMax sp:unit ?normalMaxUnit");

    var lab_exp = labResult.where("?lab_n rdf:type sp:LabResult")
                  .where("?lab_n sp:labName ?lab_name")
                  .where("?lab_name sp:codeProvenance ?cp")
                  .where("?cp rdf:type sp:CodeProvenance")
                  .where("?cp dcterms:title ?title");

    var lab_c = labResult.where("?lab rdf:type sp:LabResult")
                     .where("?lab sp:comments ?comments");

    var results = [];

    lab_results.each(function(i, lab)
    {
      results.push({date: "2007-07-02", name: lab.labTitle, desc: lab.labTitle + " " + lab.normalMinValue + " " + lab.normalMinUnit + " " + lab.nomalMaxValue + " " + lab.normalMaxValue + " " + lab.nr + "<br/>"});
    });
    lab_exp.each(function(j, lab)
    {
      results[results.length - 1].desc += lab.title + "<br/>";
    });
    lab_c.each(function(k, lab)
    {
      results[results.length - 1].desc += lab.comments;
    });

    for (var i = 0; i < results.length; i++) {
      var start = dateToTime(results[i].date);
      var end = start + Math.random() * 365 * 24 * 3600 * 1000;
      addDataPoint(addLineBreaks(sanitize(results[i].name.value)), results[i].desc, start, end, "lab");
    }

    setTimeout(function() {
      $('#chart').css('display', 'inline');
      $('#loading').css('display', 'none');
      chart1.redraw();
      resizeChart();
    }, 200);
  });
  
});
