<?php

// java.util.Date example

require_once("lib/JavaBridge/java/Java.inc");

function DateConvert($date) {

    # Exception
    if (!is_null($date))
    {
//        $date = new DateTime($date, new DateTimeZone($_SESSION['site']['timezone']));
        $date = new DateTime($date, new DateTimeZone('Asia/Jakarta'));
        $strdate = $date->format('m/d/Y H:i:s');

        # Separate Date from Time
        $strdate = explode(" ", $strdate);

        $date = $strdate[0];

    }

    return $date;

} # End Function

function convertValue($value, $className)

{

    // if we are a string, just use the normal conversion

    // methods from the java extension...

    try

    {

        if ($className == 'java.lang.String')

        {

            $temp = new Java('java.lang.String', $value);

            return $temp;

        }

        else if ($className == 'java.lang.Date')

        {

            $formatter = new Java('java.text.SimpleDateFormat', "MM-dd-yyyy");

            $tgl = $formatter->parse($value);

            $temp = new Java($className);

            $javaObject = $temp->valueOf($tgl);

            return $javaObject;

        }

        else if ($className == 'java.lang.Boolean' ||

            $className == 'java.lang.Integer' ||

            $className == 'java.lang.Long' ||

            $className == 'java.lang.Short' ||

            $className == 'java.lang.Double' ||

            $className == 'java.math.BigDecimal')

        {

            $temp = new Java($className, $value);

            return $temp;

        }

        else if ($className == 'java.sql.Timestamp' ||

            $className == 'java.sql.Time')

        {

            $temp = new Java($className);

            $javaObject = $temp->valueOf($value);

            return $javaObject;

        }

    }

    catch (Exception $err)

    {

        echo (  'unable to convert value, ' . $value .

            ' could not be converted to ' . $className);

        return false;

    }
}


$tgl = new DateTime($date, new DateTimeZone('Asia/Jakarta'));

// java.util.Date example
$formatter = new Java('java.text.SimpleDateFormat',
    "EEEE, MM dd, yyyy h:mm:ss a zzzz");

print $formatter->format(new Java('java.util.Date'));


$formatter = new Java('java.text.SimpleDateFormat', "MM-dd-yyyy");

String dateString = "2001/03/09";

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/mm/dd");
    Date convertedDate = dateFormat.parse(dateString);



print $formatter->;
print '<br>';

print $formatter->format(new Java('java.util.Date'));
print '<br>';

print convertValue($formatter->value, 'java.lang.Date');
print '<br>';

$date = "2013-05-28T07:00:00";

$tgl = new DateTime($date, new DateTimeZone('Asia/Jakarta'));

$tgl = DateConvert($date);

print $tgl;
//print convertValue($tgl, 'java.lang.Date');


