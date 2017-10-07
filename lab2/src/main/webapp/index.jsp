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
  <link rel="shortcut icon" href="static/img/logo.png">
  <title>This is all but the cat</title>
</head>

<body>
<table id="wrapper" class="border">
  <!-- The hat  -->
  <caption class="header">Ощепков, Буланцов P3202 <br> Вариант #503</caption>
  <tr>
    <td class="centered" colspan="3">
      <span id="error_title">Ошибка: </span>
      <span id="error">пока никакой</span>
      <span id="error_smile"> ;)</span>
    </td>
  </tr>
  <tr>
    <td>
      <table class="border">
        <tr>
          <td colspan="2">Введи меня полностью</td>
        </tr>
        <form action="hitTheArea.php" method="post" id="mainForm">
          <input type="hidden" name="Y" value="default">
          <tr>
            <th>X</th>
            <td colspan="9"><input type="text" name="X" value="0" id="X" oninput="limitPrecise(this)"></td>
          </tr>
          <tr>
            <th>Y</th>
            <td>
              <table>
                <tr>
                  <td><input type = "button" name="Z" value="4" class="butt" onclick="yButtonPress(this)" ></td>
                  <td><input type = "button" name="Z" value="3" class="butt" onclick="yButtonPress(this)"></td>
                  <td><input type = "button" name="Z" value="2" class="butt" onclick="yButtonPress(this)"></td>
                  <td><input type = "button" name="Z" value="1" class="butt" onclick="yButtonPress(this)"></td>
                </tr>
                <tr>
                  <td colspan="3"><input type="button" name="sub" value="ОТПРАВИТЬ" class="butt" onclick="validate()" id="submitButt"></td>
                  <td><input type = "button" name="Z" value="0" class="butt" onclick="yButtonPress(this)" id="defbutt"></td>
                </tr>
                <tr>
                  <td><input type = "button" name="Z" value="-4" class="butt" onclick="yButtonPress(this)" background= "#094040";
                  ></td>
                  <td><input type = "button" name="Z" value="-3" class="butt" onclick="yButtonPress(this)"></td>
                  <td><input type = "button" name="Z" value="-2" class="butt" onclick="yButtonPress(this)"></td>
                  <td><input type = "button" name="Z" value="-1" class="butt" onclick="yButtonPress(this)"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th>R</th>
            <td colspan="9"><input type="text" id="R" name="R" value="3" oninput="limitPrecise(this)"></td>
          </tr>
        </form>
      </table>
    </td>
    <td>
      <img src="img/areas.png">
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
<script type="text/javascript" src="validateAreaForm.js"></script>
</html>