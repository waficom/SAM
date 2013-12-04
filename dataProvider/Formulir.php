<?php
/*
 GaiaEHR (Electronic Health Records)
 Fees.php
 Fees dataProvider
 Copyright (C) 2012 Certun, Inc.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see
 <http://www.gnu.org/licenses/>
 .
 */

if (!isset($_SESSION))
{
    session_name("GaiaEHR");
    session_start();
    session_cache_limiter('private');
}

$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Formulir
{
    /**
     * @var dbHelper
     */
    private $db;

    function __construct()
    {
        // Declare all the variables that we are gone to use
        // within the class.
        (object)$this->db = new dbHelper();
        return;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getAnalisaBJ(stdClass $params)
    {
        $wherex = "co_id = '" . $_SESSION['user']['site'] . "'";

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'no_doc';
        }
        $sql = "SELECT * FROM analisabj WHERE $wherex ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;


    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addAnalisaBJ(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id'], $data['urut']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['tglmasuk'] = $this->db->Date_Converter($data['tglmasuk']);
        $data['tglmulai'] = $this->db->Date_Converter($data['tglmulai']);
        $data['tglselesai'] = $this->db->Date_Converter($data['tglselesai']);
        $sql = $this -> db -> sqlBind($data, 'analisabj', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAnalisaBJ(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['co_id'], $data['no_doc'], $data['urut']);
        $data['tglmasuk'] = $this->db->Date_Converter($data['tglmasuk']);
        $data['tglmulai'] = $this->db->Date_Converter($data['tglmulai']);
        $data['tglselesai'] = $this->db->Date_Converter($data['tglselesai']);
        $sql = $this -> db -> sqlBind($data, 'analisaBJ', 'U', array('co_id' => $params->co_id,
             'no_doc' => $params -> no_doc,
             'urut' => $params->urut));
        $this -> db -> setSQL($sql);
//        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteAnalisaBJ(stdClass $params)
    {
        $sql = "DELETE FROM analisabj WHERE (co_id = '$params->co_id') and (no_doc = '$params->no_doc') and (urut = $params->urut)";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getAnalisaBB(stdClass $params)
    {
        $wherex = "co_id = '" . $_SESSION['user']['site'] . "'";

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'no_doc';
        }
        $sql = "SELECT * FROM analisabb WHERE $wherex ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;


    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addAnalisaBB(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id'], $data['urut']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['tgldatang'] = $this->db->Date_Converter($data['tgldatang']);
        $data['tglambil'] = $this->db->DateTime_Converter($data['tglambil']);
        $sql = $this -> db -> sqlBind($data, 'analisabb', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAnalisaBB(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['co_id'], $data['urut'], $data['no_doc']);
        $data['tgldatang'] = $this->db->Date_Converter($data['tgldatang']);
        $data['tglambil'] = $this->db->DateTime_Converter($data['tglambil']);
        $sql = $this -> db -> sqlBind($data, 'analisaBB', 'U', array('co_id' => $params->co_id,
            'no_doc' => $params -> no_doc,
            'urut' => $params->urut));
        $this -> db -> setSQL($sql);
//        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteAnalisaBB(stdClass $params)
    {
        $sql = "DELETE FROM analisabb WHERE (co_id = '$params->co_id') and (no_doc = '$params->no_doc')
         and (urut = $params->urut)";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getAnalisaTB(stdClass $params)
    {
        $wherex = "co_id = '" . $_SESSION['user']['site'] . "'";

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'no_doc';
        }
        $sql = "SELECT * FROM analisatb WHERE $wherex ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;


    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addAnalisaTB(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id'], $data['urut']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['tanggal'] = $this->db->DateTime_Converter($data['tanggal']);
        $sql = $this -> db -> sqlBind($data, 'analisatb', 'I');
        $this -> db -> setSQL($sql);
//        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAnalisaTB(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['no_doc'], $data['urut'], $data['co_id']);
        $data['tanggal'] = $this->db->DateTime_Converter($data['tanggal']);
        $sql = $this -> db -> sqlBind($data, 'analisaTB', 'U', array('co_id' => $params->co_id,
            'no_doc' => $params -> no_doc,
            'urut' => $params -> urut));
        $this -> db -> setSQL($sql);
//        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteAnalisaTB(stdClass $params)
    {
        $sql = "DELETE FROM analisatb WHERE (co_id = '$params->co_id') and
           (no_doc = '$params->no_doc') and (urut = $params->urut)";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

}
