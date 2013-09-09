<?php

if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Penyusutan_Aset2
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
    public function getPenyusutan_Aset2(stdClass $params)
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
        $sql = "select a.co_id, b.account, a.qty * a.harga as debit, a.timeedit, c.coa_nama, a.inv_code, b.so_num, a.sequence_no
        from ap_inv_detail a
        inner join ap_inv b on a.inv_code=b.inv_code and a.co_id=b.co_id
        left join coa c on b.account=c.coa_id and a.co_id=c.co_id
        where b.choose='A' and b.status='1' and a.status_aset='N' and (a.sisa_umur_aset > 0 or a.sisa_umur_aset is null) and b.account='$params->account'
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
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addPenyusutan_Aset2(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'],$data['coa_nama'],$data['sisa_umur_aset'],$data['debit'],$data['account'],$data['sequence_no']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['pa_id'] = 'U4';
        $data['status_aset'] = 'Y';
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this -> db -> sqlBind($data, 'ap_inv_detail', 'U', array('inv_code' => $params-> inv_code,'sequence_no' => $params-> sequence_no));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
