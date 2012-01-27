jQuery Annotation Plugin
========================

The *jQuery Annotation Plugin* is a practical experiment that allow HTML elements being annotated with functionalities without writing a single code of JavaScript.

What? No JavaScrit code?
------------------------

Yes. All you need are two script references.

```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery.annotations.js"></script>
```

And just start annotating your HTML elements!

How to annotate HTML elements?
------------------------------

Simple! Add a class value to your HTML elements like `@onclick-show-box1`. It would be more of help if you take a look at the following example.

A full example please!
----------------------

```
<html>
  <head>
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery.annotations.js"></script>
  </head>
  <body>
    <!-- C_l_i_c_k_i_n_g this link will s_h_o_w the element with id b_o_x_1  -->
    <a href="#" class="@onclick-show-box1">@onclick-show-box1</a>
    <div id="box1" class="box" style="display:none">
      #box1
    </div>
  </body>
</html>
```