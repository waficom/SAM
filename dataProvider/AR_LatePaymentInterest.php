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
class AR_LatePaymentInterest
{

    private $db;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }

    public function getAR_Lpi(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, b.cust_nama
        from ar_sale_interest a
        left join customer b on a.co_id=b.co_id and a.cust_id=b.cust_id
        where a.co_id='$company' ORDER BY a.timeedit DESC";
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
    public function addAR_Lpi(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['cust_nama']);
        if($params->status =='false'){
            $data['status']= '0';
        }
        else if($params->status =='true'){
            $data['status']='1';
        }
        $sql = $this->db->sqlBind($data, 'ar_sale_interest', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAR_Lpi(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['cust_nama']);
        if($params->status =='false'){
            $data['status']= '0';
        }
        else if($params->status =='true'){
            $data['status']='1';
        }
        $sql = $this->db->sqlBind($data, 'ar_sale_interest', 'U', array('co_id' => $params->co_id, 'inv_code' => $params->inv_code));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteAR_Lpi(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM ar_sale_interest WHERE (co_id = '$company') and (inv_code = '$params->inv_code')" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
