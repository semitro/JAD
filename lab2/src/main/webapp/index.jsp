<%--
  Created by IntelliJ IDEA.
  User: semitro
  Date: 07.10.17
  Time: 17:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
  <meta charset="utf-8">
  <style>
    @import url("static/css/indexStyle.css");
  </style>
  <link href="static/css/toastr.scss" rel="stylesheet"/>
  <link rel="shortcut icon" href="static/img/logo.png">
  <title>This is all but the cat</title>
</head>

<body>
<table id="wrapper" class="border">
  <!-- The hat  -->
  <caption class="header">Ощепков, Буланцов P3202 <br> Вариант #505</caption>
  <tr>
    <td>
      <table class="border">
        <tr>
          <td colspan="2">Введи меня полностью</td>
        </tr>
        <form action="mainController" method="post" id="mainForm">
          <tr>
            <th>Y</th>
            <td colspan="9"><input type="text" name="Y" value="0" id="Y" oninput="limitPrecise(this)"></td>
          </tr>
          <tr>
            <th>X</th>
            <td>
              <table>
                <tr>
                  <td><input type = "radio" name="X" value="2" id="x2">
                  	<label for="x2"><span>1</span></label></td>
                  <td><input type = "radio" name="X" value="1.5" id="x1.5">
                  	<label for="x1.5"><span>1</span></label></td>
                  <td><input type = "radio" name="X" value="1" id="x1">
                  	<label for="x1"><span>1</span></label></td>
                  <td><input type = "radio" name="X" value="0.5" id="x0.5">
                  	<label for="x0.5"><spsan>0.5</spsan></label></td>
                </tr>
                <tr>
                  <td colspan="3"><input type="button" name="sub" value="ОТПРАВИТЬ" class="butt" onclick="validate()" id="submitButt"></td>
                  <td><input type = "radio" name="X" value="0" id="x0">
                    <label for="x0"><span>0</span></label>
                  </td>
                  </td>
                </tr>
                <tr>
                  <td><input type = "radio" name="X" value="-2" id ="x-2">
                    <label for="x-2"><span>-2</span></label></td>
                  </td>
                  <td><input type = "radio" name="X" value="-1.5"  id="x-1.5">
                  	<label for="x-1.5"><span>-1.5</span></label></td>
                  <td><input type = "radio" name="X" value="-2" id="x-1">
                  	<label for="x-1"><span>-1.0</span></label></td>
                  <td><input type = "radio" name="X" value="-0.5" id="x-0.5">
                  	<label for="x-0.5"><span>-0.5</span></label></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th>R</th>
            <td colspan="9"><input type="text" id="R" name="R" value="3" maxlength="100" oninput="limitPrecise(this)"></td>
          </tr>
        </form>
      </table>
    </td>
    <td>
      <img src="static/img/areas.png" class="plot">
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <div id="results_wrapper">
        <table id="results">
          <thead><tr>
            <th>Попадание</th>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Время работы скрипта</th>
            <th>Который час?</th>
          </tr></thead>
          <tbody id="results_body"></tbody>
        </table>
        <div id="results_border"></div>
      </div>
    </td>
  </tr>
  <caption class="footer"><marquee>hacked by sxx360Haxxor69xx</marquee></caption>
</table>
</body>
<script type="text/javascript" src="static/js/jquery-min.js"></script>
<script type="text/javascript" src="static/js/toastr.js"></script>
<script type="text/javascript" src="static/js/validateAreaForm.js"></script>
<script type="text/javascript" src="static/js/dotDrawer.js"></script>

</html>