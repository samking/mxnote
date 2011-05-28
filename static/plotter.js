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

/**
 * COOKIES
 */

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
  }
}

//Changes an internal trackType (prob, med, lab) into a pretty display track
//type (Problem, Medication, Lab).
//If there is an undefined trackType, returns it unchanged.
function makeDisplayTrackType(trackType) {
  if (trackType == 'prob') return "Problem";
  if (trackType == 'med') return "Medication";
  if (trackType == 'lab') return "Lab";
  return trackType;
}

//returns a string containing all user notes formatted to output in HTML
function generateTextToExport () {
  var text = "";
  var LINE_DELIMITER = "<br />\n";

  //adds each of the notes
  for (var trackName in tracksMap) {
    var track = tracksMap[trackName];
    for (var noteId in track.notes) {
      var note = track.notes[noteId];
      var displayTrackType = makeDisplayTrackType(track.type);
      text += displayTrackType + ": " + track.name.replace(/<br.*>/ig, " ") + 
              LINE_DELIMITER + 
              Highcharts.dateFormat('%B %e, %Y, %H:%M', note.date) + LINE_DELIMITER +
              note.type + ": " + note.description + LINE_DELIMITER + 
              LINE_DELIMITER;
    }
  }
  return text;
}

/**
 * Exporting
 */
 
function exportNotes() {
  newWin = window.open("");
  newWin.document.write(generateTextToExport());
  newWin.print();
}

/**
 * SMART fetching
 */

/* does manual word wrap for all the names */
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

/* removes quotes as necessary */
function sanitize (str) {
  if (str.substring(0, 1) == '"' && str.substring(str.length - 1) == '"')
    return str.substring(1, str.length - 2);
  return str;
}

function cmpDataPts(a, b) {
  return a.start - b.start;
}

function fetchProblems(probs) {
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
}

function fetchMeds(meds) {
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
      'desc' : single.drugname + "<br/>" + single.instruct + "<br/>" + 
               single.qval + " " + single.qUnit + "<br/>" + single.freq_val + 
               " " + single.freq_unit,
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
}

function fetchLabs(labResult) {
  $('#status').html('Fetching patient lab results...');
  var lab_results = labResult.where("?lab rdf:type sp:LabResult")
                             .where("?lab sp:labName ?lab_name")
                             .where("?lab_name dcterms:title ?labTitle")
                             .where("?lab sp:quantitativeResult ?qr")
                             .where("?qr rdf:type sp:QuantitativeResult")
                             .where("?qr sp:valueAndUnit ?vAu")
                             .where("?vAu sp:value ?Lvalue")
                             .where("?vAu sp:unit ?Lunit")
                             .where("?qr sp:normalRange ?nr")
                             .where("?nr sp:minimum ?normalMin")
                             .where("?normalMin sp:value ?normalMinValue")
                             .where("?normalMin sp:unit ?normalMinUnit")
                             .where("?nr sp:maximum ?normalMax")
                             .where("?normalMax sp:value ?normalMaxValue")
                             .where("?normalMax sp:unit ?normalMaxUnit")
                             .where("?lab sp:specimenCollected ?spc")
                             .where("?spc sp:startTime ?st");

  var lab_exp = labResult.where("?lab_n rdf:type sp:LabResult")
                         .where("?lab_n sp:labName ?lab_name")
                         .where("?lab_name sp:codeProvenance ?cp")
                         .where("?cp rdf:type sp:CodeProvenance")
                         .where("?cp dcterms:title ?title");

  var lab_c = labResult.where("?lab rdf:type sp:LabResult")
                       .where("?lab sp:comments ?comments");

  var results = [];

  var labNames = new Array('Cholest SerPl-mCnc', 'HDLc SerPl-mCnc', 
                           'LDLc SerPl Calc-mCnc', 'Trigl SerPl-mCnc', 
                           'CRP SerPl HS-mCnc', 'Albumin SerPl-mCnc', 
                           'Albumin/Creat Ur-mRto', 'Glucose Bld-mCnc', 
                           'Glucose p fast SerPl-mCnc', 'Glucose SerPl-mCnc', 
                           'Hgb A1c MFr Bld',  'Prot SerPl-mCnc');

  var labDesc = new Array('Cholestrol', 'HDL', 'LDL', 'Triglyceride', 
                          'C-reactive protein', 'Albumin', 
                          'Albumin/Creatine Ratio (Urine)', 'Blood Glucose', 
                           'Fasting Blood Glucose', 'Serum Glucose', 
                           'Hemoglobin A1c', 'Serum Protein');

  var normal = new Array(200, 40, 129, 150, 1, 3, 0, 99, 99, 99, 7, 7.9);


  var border = new Array(249, 59, 159, 199, 2.9, 5.4, 0, 125, 125, 125, 8, 7.9);

  var very_high = new Array(250, 60, 160, 500, 3, 5.5, 0, 126, 126, 126, 10, 8);

  function getIndex(name)
  {
    for (var i = 0; i < labNames.length; i++)
    {
       if(name == labNames[i])
          return i;
    }

    // THIS SHOULD NEVER HAPPEN.
    return -1;
  }

  function getIntensity(value, index)
  {
    if (index == 6)
    {
       // We don't have values for this test.
       // ASK BRENDAN
       return 0;
    }
    /* What about LDL stuff?
     * 1: NORMAL 
     * 2: BORDER LINE
     * 3: HIGH
     * 4: VERY HIGH
     */ 
    // BIG ASSUMPTION - Units are same - TODO - put in a check...
    /* if <= normal, then normal, if between normal and border then borderline,
     * if between border and very high, then high and more than very high, then
     * very high.
     */
    //alert("index:  " + index + " " + labNames[index] + " value : " + value + " " + normal[index] + " " + border[index] + " " + very_high[index]);
    if (value <= normal[index])
      return 1;  
    else
    {
       if (value <= border[index])
          return 2;
       else if (value < very_high[index])
          return 3;
       else
         return 4;
    }
  }

  lab_results.each(function(i, lab)
  {
    lab_name = lab.labTitle;

    /* Strip quotes (name, normalMinValue and normalMinUnit).*/
    lab_name = lab_name.value.replace(/"/g, "");
    value = lab.Lvalue.value.replace(/"/g, "");
    unit = lab.Lunit.value.replace(/"/g, "");
    lab_date = lab.st.value.replace(/"/g, "");

    index = getIndex(lab_name);
    lab_desc = labDesc[index];
    colorVal = getIntensity(value, index);

    // Assuming that quotes have been stripped off for everything.

    /*
     * Jason - you wanted name, desc (with values in it), date and colorVal - UNCOMMENT FOLLOWING*/
     name = lab_name.value;
     if (lab_desc == undefined)
        desc = "Value: " + value + unit;
     else
        desc = lab_desc + " " + "Value: " + value + unit;
     date = lab_date;
     colorVal = colorVal;

    // OLD CALL ==> addLab(sanitize(lab_name.value), lab_desc, lab.normalMinValue + lab.normalMinUnit, colorVal);

    addLab(lab_name, desc, dateToTime(sanitize(date)), colorVal);
  });
}


/**
 * Manipulating tracksMap data structure
 */

function addDataPoint(trackName, description, startTime, endTime, type, colorVal) {
  var track = tracksMap[trackName];
  if (track == undefined) {
    tracksMap[trackName] = {
      'name'   : trackName,
      'type'   : type,
      'events' : [],
      'notes'  : [],
    };
    track = tracksMap[trackName];
  }
  var addEvent = true;
  for (var currEvent in track.events) {
    if (currEvent.description == description) addEvent = false;
  }

  if (addEvent) {
    var event = {
        'description' : description,
        'startTime'   : startTime,
        'endTime'     : endTime,
    }
    if (colorVal != undefined)
      event.colorVal = colorVal;
    track['events'].push(event);
  }
}

function addLab(trackName, description, date, colorVal) {
  addDataPoint(trackName, description, date, null, 'lab', colorVal);
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
    /* TODO: What if the same series has an event starting and another ending 
     * at the same time? 
     */
    if (events[i].startTime == x || events[i].endTime == x) 
      return events[i].description;
  }

  return getNotesText(series, x);
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

/* Switches the scheme. Destroys the current chart and re-initializes with
 * relevant series.
 */
function switchScheme(scheme) {
  if (scheme == curScheme) return;
  $('#scheme-status').css('visibility', 'visible');
  curScheme = scheme;
  
  var schemes = ['Cardio', 'T2d', 'Mental'];
  for (i in schemes) {
    var s = schemes[i];
    if (s == curScheme) {
      $('#' + s + '-button').attr('src', '../static/img/' + s + 
          '_button_active.png');
    } else {
      $('#' + s + '-button').attr('src', '../static/img/' + s + 
          '_button.png');
    }
  }
  
  if (chart1) chart1.destroy();
  initializeChart();

  /* yuck.  timeouts because loadData is a real pain and completely hangs the
   * browser.
   */
  setTimeout(function() {
    loadData();
    setTimeout( function() {
      resizeChart();
      chart1.redraw();
      $('#scheme-status').css('visibility', 'hidden');
    }, 300);
  }, 100);
}

/**
 * Chart stuff
 */

/*
 * Looks at how many series we're displaying and sizes the chart appropriately
 */
function resizeChart() {
  var count = chart1.series.length;
  if (count <= 10) {
    height = 500;
  } else {
    height = count * 50;
  }
  $('#chart-container-1').css('height', String(height) + 'px');
  chart1.setSize(window.innerWidth, height);
}


/* HighCharts transforms the labels, but doesn't apply styles properly 
 * if it has a <br/>...
 */
function colorize(html, color) {
  var res = '';
  var lns = html.split('<br/>');
  for (var i = 0; i < lns.length; i++) {
    res += '<div style="color: ' + color + ';">' + lns[i]  + '</div><br/>';
  }
  return res;
}
/*
 * Note: can hang the browser and prevent changes to the DOM...
 */
function plotTrack(trackName) {
  var track = tracksMap[trackName];
  chart1.addSeries({
      name: trackName, 
      data: [], 
      color: colors[track.type], 
      stickyTracking: false
  }, false, false);
  track.id = nextId++;
  track.yVal = nextVal++;
  
  for (var i = 0; i < track.events.length; i++) {
    var event = track.events[i];
    var symbol = 'circle';
    if (event.colorVal) {
      symbol = 'url(../static/img/lab' + event.colorVal.toString() + '.png)';
    }

    chart1.series[track.id].addPoint({
      x: event.startTime, 
      y: track.yVal, 
      marker: {symbol: symbol}
    }); 
    if (event.endTime != null)
      chart1.series[track.id].addPoint({
        x: event.endTime, 
        y: track.yVal, 
        marker: {symbol: 'circle'}
    });
  }
  
  for (var noteId in track.notes) {
    var note = track.notes[noteId];
    var series = chart1.series[track.id];
    series.addPoint({
      x: note.date, 
      y: track.yVal, 
      marker: {
        symbol: 'url(../static/img/' + note.type + '_note.png)'
      }
    });
  }
}

/* loads the data from tracksMap into the chart.
 * assumes chart is initialized.
 */
function loadData() {
  if (!chart1) return;

  var numToShow = 0;
  for (trackName in tracksMap) {
    if (isInDiseaseScheme(trackName, curScheme)) {
      numToShow ++;
      plotTrack(trackName);
    }
  }
  if (numToShow == 0) {
    $('#no-items-msg').html('No items to display.');
    $('#show-no-items').css('display', 'inline');
    $('#export-button').css('display', 'none');
  } else {
    $('#show-no-items').css('display', 'none');
    $('#export-button').css('display', 'inline');
  }
}

function initializeChart() {
  /* clear out display data */
  nextVal = 1;
  nextId = 0;
  for (key in tracksMap) {
    tracksMap[key].yVal = null;
    tracksMap[key].id = null;
  }
  
  /* make the new chart */
  chart1 = new Highcharts.Chart({
    chart: {
      renderTo: 'chart-container-1',
      defaultSeriesType: 'scatter',
      zoomType: 'x',
      marginTop: 70,
      events: {
        click: function(e) {
            /* prevent Chrome from interpreting a click on reset zoom as a 
             * click on the graph
             */
            if (e.srcElement != undefined && e.srcElement.nodeName == "tspan")
              return;
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
      text: 'Click and drag to zoom.<br/>[click on any colored line to add a note]'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // always display full date
        hour: '%b %e %H:%M'
      },
      maxZoom: 3600000, // one hour
      maxPadding: .2,
      minPadding: .2,
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
            var track = tracksMap[key];
            if (chart1.series[track.id] && track.yVal == this.value &&
                chart1.series[track.id].visible)
              return colorize(key, colors[tracksMap[key].type]);
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
      y: 30,
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
            chart1.redraw();
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
            chart1.redraw();
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
        return '<b>' + Highcharts.dateFormat('%Y %B %e', this.x) + 
          '</b><br/>' + getDescription(this.series, this.x);
      }
    },
    series: [],
  });
}
/* makes the save note dialog */
function createDialog(track, series, xVal) {
  $('#date').text(Highcharts.dateFormat('Date: %B %e, %Y', xVal));
  $('#time').text(Highcharts.dateFormat('Time: %H:%M', xVal));
  $('#track-title').text(track.name);
  var desc = getNotesText(series, xVal);
  // Do not open a dialog if we click an event
  if (desc == null && getDescription(series, xVal) != null) return;
  $( '#textOfNote' ).val(desc);
  //if the current event already has a type, default it to that
  var type = getNotesProperty(series, xVal, 'type');
  if (type != undefined) 
    $('#typeOfNote').val(type);
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
          series.addPoint({
            x: xVal,
            y: series.data[0].y, 
            marker: {
              symbol: 'url(../static/img/' + $('#typeOfNote').val() + '_note.png)'
            }
          });

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
    height: 480,
    width: 600,
    modal: true,
    title: (desc === null ? 'New Note' : 'Edit Note'),
    buttons: buttons,
    close: function() {
    }
  });
  $( "#dialog" ).dialog('open');
}

/**
 *  document.ready.  main, in a sense. :)
 */
$(document).ready(function() {
  initializeChart();
  loadDataFromCookie();
  
  SMART.PROBLEMS_get(fetchProblems);
  SMART.MEDS_get(fetchMeds);
  
  /* we want to chain-load the DOM changes after we finish fetching results. */
  SMART.LAB_RESULTS_get(function(labResults) {
    fetchLabs(labResults);
    setTimeout(function() {
      $('#chart').css('display', 'inline');
      $('#loading').css('display', 'none');
    }, 200);
  });
});
