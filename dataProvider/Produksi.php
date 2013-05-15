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

class Produksi
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

    public function getProduksiLiveSearch(stdClass $params)
    {
        $this->db->setSQL("SELECT no_pp,
		                          description,
		                          pp_date
							FROM PP_Produksi");

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

    public function getProduksi(stdClass $params)
    {
        $sql = "SELECT * FROM PP_Produksi ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }

    public function getViewDetailProduksi(stdClass $params)
    {
        $this->db->setSQL("SELECT *
                         FROM PP_DETAILPRODUKSI
                    WHERE no_ppd = '" . $params->no_ppd ."'ORDER BY timeedit DESC");
//        $this -> db -> setSQL($sql);
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
    public function addProduksi(stdClass $params)
    {
//        error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['pp_date'] = $this->db->Date_Converter($data['pp_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'I');
        $this -> db -> setSQL($sql);
//           print_r($sql);
        $this -> db -> execLog();
//        error_reporting(0);
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateProduksi(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['status'] = 'C';
        unset($data['id'], $data['no_pp'], $data['old_no_pp']);
        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'U', array('no_pp' => $params-> old_no_pp));
        $this -> db -> setSQL($sql);
       // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteProduksi(stdClass $params)
    {
        $sql = "DELETE FROM PP_DETAILPRODUKSI WHERE no_pp = '$params->no_pp'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM PP_Produksi WHERE no_pp = '$params->no_pp'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getProduksi1(stdClass $params)
    {
         //error_reporting(-1);
        $this->db->setSQL("SELECT *
                         FROM VIEWDETAILPRODUKSI
                    WHERE no_pp = '" . $params->no_pp ."'ORDER BY timeedit DESC");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function addProduksi1(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['finishdate'] = $this->db->Date_Converter($data['finishdate']);
        $data['est_finishdate'] = $this->db->Date_Converter($data['est_finishdate']);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $sql = $this -> db -> sqlBind($data, 'PP_DETAILPRODUKSI', 'I');
        $this -> db -> setSQL($sql);
            //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateProduksi1(stdClass $params)
    {
       // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['finishdate'] = $this->db->Date_Converter($data['finishdate']);
        $data['est_finishdate'] = $this->db->Date_Converter($data['est_finishdate']);
        //$data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['no_pp'], $data['old_no_ppd'], $data['cust_nama'], $data['formula_nama'], $data['prod_nama'], $data['spesifikasi_nama'],$data['kemasan_nama'],
        $data['n'], $data['p2o5'], $data['k2o'], $data['cao'], $data['mgo'], $data['so4'], $data['b'], $data['cu'], $data['zn']
        , $data['ah'], $data['af']);
        $sql = $this -> db -> sqlBind($data, 'PP_DETAILPRODUKSI', 'U', array('no_ppd' => $params-> old_no_ppd));
        $this -> db -> setSQL($sql);
        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteProduksi1(stdClass $params)
    {
        $sql = "DELETE FROM PP_DETAILPRODUKSI WHERE (no_ppd = '$params->no_ppd') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function getSOpopup(stdClass $params)
    {
        $sql = "SELECT * FROM so0 ORDER BY so_num ASC";
        $this -> db -> setSQL($sql);
       // print_r($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getFormulapopup(stdClass $params)
    {
        $sql = "SELECT * FROM formula0 ORDER BY formula_id ASC";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }


}

