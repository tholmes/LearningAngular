<!DOCTYPE html>
<html>
<head>
    <title>jQuery data binding example</title>
    <script src="jquery.js">
    </script>
</head>

<body>
    <input type="text" id="username">
    <div>
        Hello,
        <span id="display_username">
        </span>
    </div>

    <script type="application/javascript">
        $(document).ready(function() {
            $('#username').on('keyup', function() {
                $('#display_username').html($('#username').val());
            });
        });
    </script>
</body>

</html>
