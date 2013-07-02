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

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'so_num';
        }
        $sql = "SELECT A.*, B.cust_nama FROM so0 A
         left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id ORDER BY $orderx DESC";
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

        $sql = "SELECT * from pp_produksi ORDER BY timeedit";
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

        $sql = "SELECT po0.*, vendor.vend_nama
				FROM
					po0
				LEFT JOIN
					vendor
				ON vendor.vend_id = po0.vend_id ORDER BY timeedit";
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

        $sql = "SELECT * from gr0 ORDER BY gr_num";
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

        $sql = "SELECT * from coa ORDER BY coa_id";
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
