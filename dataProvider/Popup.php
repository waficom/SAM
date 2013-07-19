<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');
class Popup
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

    public function SalesOrderPopup(stdClass $params)
    {

        $sql = "SELECT A.*, B.cust_nama, C.prod_id FROM so0 A
         left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id
         left join so11 C on A.so_num=C.so_num and A.co_id=C.co_id
         where A.status<>'A' ORDER BY A.so_num DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function FormulaPopup(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'formula_id';
        }
        $sql = "SELECT f0.*, sp.spesifikasi_nama, c.cust_nama
		             FROM formula0 f0
		             LEFT JOIN customer c ON c.cust_id = f0.cust_id and c.co_id = f0.co_id
		             LEFT JOIN spesifikasi sp ON sp.spesifikasi_id = f0.spesifikasi_id and sp.co_id = f0.co_id ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function GudangPopup(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'gudang_id';
        }
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function GudangBMPopup(stdClass $params)
    {
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id
		             where A.gdg_type='BM' ORDER BY A.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function GudangBDPPopup(stdClass $params)
    {
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id
		             where A.gdg_type='BDP' ORDER BY A.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function GudangBJPopup(stdClass $params)
    {
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id
		             where A.gdg_type='BJ' ORDER BY A.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function VendorSuplierPopup(stdClass $params)
    {

        $sql = "SELECT A.*, case vend_type when 'S' then 'Suplier' else 'Transporter' end as vend_type_desc FROM vendor A where A.vend_type='S' ORDER BY A.vend_id";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function VendorTransporterPopup(stdClass $params)
    {

        $sql = "SELECT A.*, case vend_type when 'S' then 'Suplier' else 'Transporter' end as vend_type_desc FROM vendor A where A.vend_type='T' ORDER BY A.vend_id";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function ProduksiPopup(stdClass $params)
    {

        $sql = "SELECT * from pp_produksi ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }

    public function POPopup(stdClass $params)
    {

        /*$sql = "SELECT po0.*, vendor.vend_nama
				FROM
					po0
				LEFT JOIN
					vendor
				ON vendor.vend_id = po0.vend_id where po0.status=1 ORDER BY timeedit DESC";*/
        $sql ="select distinct A.po_num, A.tgl, A.vend_id, C.vend_nama
        from po0 A
        left join po1 A1 on A.po_num=A1.po_num and A.co_id=A1.co_id
        left join (
            select gr10.bb_id, gr10.co_id, gr0.po_num, sum(gr11.qty_netto) as qty from gr0
            inner join gr10 on gr0.gr_num=gr10.gr_num and gr0.co_id=gr10.co_id
            inner join gr11 on gr10.gr_num=gr11.gr_num and gr10.co_id=gr11.co_id and gr10.bb_id=gr11.bb_id
            group by gr10.bb_id, gr10.co_id, gr0.po_num)B on A.po_num=B.po_num and A.co_id=B.co_id and A1.bb_id=B.bb_id
        left join vendor C on A.vend_id=C.vend_id and A.co_id=C.co_id
        where B.qty < A1.qty or B.qty is null and A.status=1 order by A.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getGRPopup(stdClass $params)
    {

        $sql = "SELECT * from gr0 where status=1 ORDER BY gr_num";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getCoaPopup(stdClass $params)
    {

        $sql = "SELECT * from coa where status='Y' ORDER BY coa_id";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAPPayUMpopup(stdClass $params)
    {

        $sql = "SELECT A.*, B.vend_nama FROM ap_inv_pembayaran A
        left join vendor B on A.vend_id=B.vend_id and A.co_id=B.co_id
        where A.inv_type ='U' and A.status=1 and A.nilaidasar<>'0'
        ORDER BY A.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAPPayUMCancelpopup(stdClass $params)
    {

        $sql = "SELECT A.*, B.vend_nama FROM ap_inv_pembayaran A
        left join vendor B on A.vend_id=B.vend_id and A.co_id=B.co_id
        where A.inv_type ='U' and A.status=1 and not exists(select inv_um from ap_inv_pembayaran where inv_um=A.ap_inv_payment and status=1)
        ORDER BY A.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAP_Invpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ap_inv where status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAP_InvCancelpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ap_inv
        where status=1 and not exists(select inv_code from ap_inv_pembayaran where inv_code=ap_inv.inv_code and status=1)
        ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAR_Salepopup(stdClass $params)
    {

        $sql = "SELECT * FROM ar_sale where status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getARCancelpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ar_sale
        where ar_sale.status=1 and not exists(select for_inv_code from ar_sale_payment where for_inv_code=ar_sale.inv_code and status=1)
        ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getARPayUMpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ar_sale_payment where inv_type ='U' and status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAPAlpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ap_inv_pembayaran where inv_type ='A' and status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAPPaypopup(stdClass $params)
    {

        $sql = "SELECT * FROM ap_inv_pembayaran where inv_type ='N' and status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAPRCpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ap_reclass where status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAPMnfpopup(stdClass $params)
    {

        $sql = "SELECT * FROM inv_manufaktur
        where status=1 and so_num in(select so_num from deliveryorder where status<>1)
        ORDER BY timeedit";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getARPaypopup(stdClass $params)
    {

        $sql = "SELECT * FROM ar_sale_payment where inv_type='N' and status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getARAlpopup(stdClass $params)
    {

        $sql = "SELECT * FROM ar_sale_payment where inv_type='A' and status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getDeliveryOrderpopup(stdClass $params)
    {

        $sql = "SELECT * FROM deliveryorder where status='1' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getPB0(stdClass $params)
    {

        $sql = "SELECT * FROM pb0 where status=1 ORDER BY timeedit DESC";
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
     *
     * @param stdClass $params
     * @return stdClass
     */

}
