<?php
/*
GaiaEHR (Electronic Health Records)
Facilities.php
Facilities dataProvider
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
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class AP_Invoice
{
    /**
     * @var dbHelper
     */
    private $db;
    /**
     * Creates the dbHelper instance
     */
    function __construct()
    {
        $this -> db = new dbHelper();
        return;
    }

    /**
     * @param stdClass $params
     * @return array
     */

    public function getAP_Inv(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "select * from VIEW_AP_INVOICE
        where co_id ='$company' ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAP_Inv_Manufaktur(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT *
        FROM inv_manufaktur where co_id='$company'
        ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAP_Inv_Payment(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.description as bank_nama, C.vend_nama, D.posted_date as ap_inv_date, D.hutangsuplier
        FROM ap_inv_pembayaran A
        left join bank_m B on A.bank_code=B.bank_code and A.co_id=B.co_id
        left join vendor C on A.vend_id=C.vend_id and A.co_id=C.co_id
        left join ap_inv D on A.inv_code=D.inv_code and A.co_id=D.co_id
        where A.inv_type <>'A' and a.co_id='$company' ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAP_Payment_Alocation(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, B.hutangsuplier, C.nilaidasar as uangmuka, C.posted_date as inv_date_um, B.posted_date as ap_inv_date
                from ap_inv_pembayaran A
                left join ap_inv B on A.inv_code=B.inv_code and A.co_id=B.co_id
                left join ap_inv_pembayaran C on A.inv_um=C.ap_inv_payment and A.co_id=C.co_id
                where A.inv_type='A' and a.co_id='$company' ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }

    public function getAP_Inv_Detail(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM ap_inv_detail where co_id='$company' and inv_code ='$params->inv_code' ORDER BY $orderx DESC";
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
    public function addAP_Inv(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['tgl_jt'] = $this->db->Date_Converter($data['tgl_jt']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['inv_type'] = 'N';
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['inv_code'],$data['vend_nama'],$data['account_nama'],$data['tax_nama']);
        $sql = $this -> db -> sqlBind($data, 'ap_inv', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function addAP_Inv_Manufaktur(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['inv_code']);
        $sql = $this -> db -> sqlBind($data, 'inv_manufaktur', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function addAP_Inv_Payment(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        unset($data['id'],$data['ap_inv_payment'],$data['hutangsuplier'],$data['bank_nama']
        ,$data['vend_nama'],$data['inv_date_um'],$data['uangmuka'],$data['ap_inv_date']);
        $sql = $this -> db -> sqlBind($data, 'ap_inv_pembayaran', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function addAP_Inv_Detail_Manufaktur(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['type_desc'] = 'M';
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'], $data['sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'ap_inv_detail', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addAP_Inv_Detail(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['type_desc'] = 'A';
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'], $data['sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'ap_inv_detail', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAP_Inv(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['tgl_jt'] = $this->db->Date_Converter($data['tgl_jt']);
        $data['useredit'] = $_SESSION['user']['username'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['inv_code'],$data['nilaidasarx'],$data['ppn_%'],$data['ppn_nilaix'],$data['pph_%'],$data['pph_nilaix']
        ,$data['totalx'],$data['nd_setelah_discx'],$data['vend_nama'],$data['account_nama'],$data['tax_nama']);
        $sql = $this -> db -> sqlBind($data, 'ap_inv', 'U', array('inv_code' => $params -> inv_code));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateAP_Inv_Manufaktur(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['inv_code'], $data['nilaidasar']);
        $sql = $this -> db -> sqlBind($data, 'inv_manufaktur', 'U', array('inv_code' => $params -> inv_code));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateAP_Inv_Payment(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['ap_inv_payment'],$data['uangmuka'],$data['hutangsuplier'],$data['bank_nama']
        ,$data['vend_nama'],$data['inv_date_um'],$data['ap_inv_date']);
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'ap_inv_pembayaran', 'U', array('ap_inv_payment' => $params -> ap_inv_payment));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateAP_Inv_Detail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['inv_code'], $data['sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'ap_inv_detail', 'U', array('inv_code' => $params -> inv_code,'sequence_no' => $params -> sequence_no ));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "EXECUTE PROCEDURE ap_inv_detail_i '$params->inv_code'";
        $this -> db -> execOnly($sql);
        return $params;
    }


    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteAP_Inv(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM ap_inv_detail WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM ap_inv WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteAP_Inv_Manufaktur(stdClass $params)
    {
        $sql = "DELETE FROM inv_manufaktur WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM ap_inv_detail WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }
    public function deleteAP_Inv_Payment(stdClass $params)
    {
        $sql = "DELETE FROM ap_inv_pembayaran WHERE ap_inv_payment = '$params->ap_inv_payment'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->ap_inv_payment'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }
    public function deleteAP_Inv_Detail(stdClass $params)
    {
        $sql = "DELETE FROM ap_inv_detail WHERE inv_code = '$params->inv_code' and sequence_no ='$params->sequence_no' ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}
