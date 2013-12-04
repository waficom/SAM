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


    public function getProduksi(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.co_id, A.status, A.no_pp, A.description, A.pp_date, A.timeedit, A.pabrik_sequence
        , A.userinput, A.useredit, B.description as factory, a.gudang_id
        from pp_produksi A
        left join pabrik_location B on A.co_id=B.co_id and A.pabrik_sequence=B.pabrik_sequence
        where a.co_id='$company' ORDER BY A.timeedit DESC";
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
    public function addProduksi(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['pp_date'] = $this->db->Date_Converter($data['pp_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['no_pp'], $data['factory']);
        if($params->status =='false'){
            $data['status']= '0';
        }
        else if($params->status =='true'){
            $data['status']='1';
        }
        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateProduksi(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['pp_date'] = $this->db->Date_Converter($data['pp_date']);
        unset($data['id'],$data['factory'],$data['statusdesc']);
        if($params->status =='false'){
            $data['status']= '0';
        }
        else if($params->status =='true'){
            $data['status']='1';
        }
        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'U', array('no_pp' => $params-> no_pp, 'co_id' => $params-> co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteProduksi(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM PP_DETAILPRODUKSI WHERE no_pp = '$params->no_pp' and co_id='$company'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM PP_Produksi WHERE no_pp = '$params->no_pp' and co_id='$company'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getProduksi1(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("SELECT *
                         FROM VIEWDETAILPRODUKSI
                    WHERE co_id ='$company' and no_pp = '" . $params->no_pp ."'ORDER BY timeedit DESC");

        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }

    public function addProduksi1(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['finishdate'] = $this->db->Date_Converter($data['finishdate']);
        $data['est_finishdate'] = $this->db->Date_Converter($data['est_finishdate']);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['no_ppd']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $sql = $this -> db -> sqlBind($data, 'PP_DETAILPRODUKSI', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateProduksi1(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['est_finishdate'] = $this->db->Date_Converter($data['est_finishdate']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['no_pp'],$data['cust_nama'], $data['status'], $data['prod_nama']);
        $sql = $this -> db -> sqlBind($data, 'PP_DETAILPRODUKSI', 'U', array('no_ppd' => $params-> no_ppd, 'co_id' => $params-> co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteProduksi1(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM PP_DETAILPRODUKSI WHERE (no_ppd = '$params->no_ppd' and co_id='$company') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getProduksiCancel(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select distinct a.*
        from pp_produksi a
        inner join pp_detailproduksi b on a.co_id=b.co_id and a.no_pp=b.no_pp
        where a.co_id='$company' and a.status=1 and not exists(select * from wo1 where co_id='$company' and so_num=b.so_num)
        order by a.no_pp ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function updateProduksiCancel(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['cancel_date'] = $this->db->Date_Converter($data['cancel_date']);
        if($params->canceled=1){
            $data['status'] = 2;
        }
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'U', array('no_pp' => $params-> no_pp, 'co_id' => $params-> co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}

