<?php
/*
 GaiaEHR (Electronic Health Records)
 User.php
 User dataProvider
 Copyright (C) 2012 Ernesto J. Rodriguez (Certun)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Route
{

    /**
     * @var dbHelper
     */
    private $db;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }

    public function getRouteLiveSearch(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("SELECT route_code, description FROM Route where co_id='$company'");

        $records = $this->db->fetchRecords(PDO::FETCH_ASSOC);
        foreach ($records as $key => $value)
        {
            if (is_array($value))
            {
                $records[$key] = array_change_key_case($value);
            }
        }
        $total   = count($records);
        $records = array_slice($records, $params->start, $params->limit);
        return array(
            'totals' => $total,
            'rows'   => $records
        );
    }

    public function getRoute(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM Route where co_id='$company' ORDER BY timeedit DESC";
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
    public function addRoute(stdClass $params)
    {
//        error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $sql = $this -> db -> sqlBind($data, 'Route', 'I');
        $this -> db -> setSQL($sql);
//            print_r($sql);
        $this -> db -> execLog();
//        error_reporting(0);
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateRoute(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['route_code'], $data['old_route_code']);
        $sql = $this -> db -> sqlBind($data, 'Route', 'U', array('route_code' => $params-> old_route_code));
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteRoute(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM Route_D WHERE route_code = '$params->route_code' and co_id='$company'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM Route WHERE route_code = '$params->route_code' and co_id='$company'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getRouteD(stdClass $params)
    {
        //error_reporting(-1);
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("SELECT *
                         FROM Route_D
                    WHERE co_id='$company' and route_code = '" . $params->route_code ."'ORDER BY sequence_no ASC");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function addRouteD(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'Route_D', 'I');
        $this -> db -> setSQL($sql);
         //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateRouteD(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['route_code'], $data['old_sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'Route_D', 'U', array('sequence_no' => $params-> old_sequence_no));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteRouteD(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM Route_D WHERE co_id='$company' and (route_code = '$params->route_code') and (sequence_no = '$params->sequence_no') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}

