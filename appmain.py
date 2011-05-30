#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util

class bootstrap:
   def get(self):
      self.response.out.write( """<!DOCTYPE html>
      <html>
      <head><script src="http://sample-apps.smartplatforms.org/framework/smart/scripts/smart-api-client.js"></script></head>
      <body></body>
      </html>""")


class MainHandler(webapp.RequestHandler):
    def get(self):
        self.response.out.write("""
<!doctype html> 
<html> 
  <head> 
    <meta charset="utf-8"> 
    <title>Demo</title> 
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/> 
    <script src="http://sample-apps.smartplatforms.org/framework/smart/scripts/smart-api-page.js"></script></head>
    <script src="../static/jquery-git.js"></script> 
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
    <script src="../static/js/highcharts.js"></script> 
    <script src="../static/scheme.js"></script> 
    <script src="../static/plotter.js"></script> 
  </head> 
  <body bgcolor="#FFF"> 
    <div id="loading">
      <center><img src="../static/img/loading2.png" height=400px/></center> <br/> <br/>
      <div id="status" style="text-align: center; margin-top: 70px; margin-left: auto; margin-right: auto; font-family: helvetica, sans-serif;">Welcome.</div>
    </div>
    <div id="chart" style="display: none;">
      <div id="buttons" style="margin-left: auto; margin-right: auto; margin-top: 20px; text-align: center;">
        <span><img id="T2d-button" src="../static/img/T2d_button.png" height=30px onclick="javascript:switchScheme('T2d')"/></span>
        <span><img id="Cardio-button" src="../static/img/Cardio_button.png" height=30px onclick="javascript:switchScheme('Cardio')"/></span>
        <span><img id="Mental-button" src="../static/img/Mental_button.png" height=30px onclick="javascript:switchScheme('Mental')"/></span>
      </div>
      <div id="chart-container-1" style="width: 100%; height: 500px;"></div>
      <div id="logo" style="position: absolute; top: 10px; left: 10px;"><img src="../static/img/logo.png" height="72px"/></div>
      <div id="show-no-items" style="position: absolute; top: 80px; left: 0px; width: 100%;">
        <div id="no-items-msg" style="margin-top: 200px; text-align: center; font-size: 150%; font-family: Helvetica, sans-serif;">Click on a disease scheme, above.</div>
      </div>
      <div id="export-button" style="display: none; position: absolute; top: 20px; right: 30px;">
        <img src="../static/img/print_button.png" height=30px onClick="exportNotes()"/></div>
      </div>
    </div>
    <div id="export-dialog" style="display: none;">
      <p id="exportText"></p>
    </div>
    <div id="scheme-status" style="visibility: hidden; text-align: center; margin-top: 30px; margin-left: auto; margin-right: auto; font-family: helvetica, sans-serif;">Switching schemes.  Please be patient...</div>
    <div id="dialog" title="New note" style="display: none;">
      <p id="track-title" style="text-align: center; font-weight: bold;"></p>
      <p id="date"></p>
      <p id="time"></p>
      <form> 
        <select id="typeOfNote">
          <option value="positive">I Feel Better</option>
          <option value="negative">I Feel Worse</option>
          <option value="lab">Home-Recorded Lab Value</option>
          <option value="question">Question</option>
          <option value="concern">Concern</option>
        </select>
        <textarea id="textOfNote" cols=60 rows=7 name="textOfNote" class="text ui-widget-content ui-corner-all"></textarea> 
      </form> 
    </div>
    <div id="lab-key" style="display: none; padding: 5px; position: absolute; top:123px; right: 30px; font-family: Lucida Grande, sans-serif; font-size: 12px; color: #6D869F; border-style: solid; border-width: 1px; border-radius: 5px; -moz-border-radius: 5px; border-color: grey;">
      Lab Key
      <table>
        <tr>
          <td><img src="../static/img/lab_1.png" /> normal</td>
          <td><img src="../static/img/lab_2.png" /> borderline</td>
        </tr>
        <tr>
          <td><img src="../static/img/lab_3.png" /> high</td>
          <td><img src="../static/img/lab_4.png" /> very high</td>
        </tr>
      </table>
    </div>
  </body> 
</html>""")


def main():
    application = webapp.WSGIApplication([('/smartapp/index.html', MainHandler), ('/smartapp/bootstrap.html', 'bootstrap')],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == "__main__":
   main()
