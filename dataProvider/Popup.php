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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.cust_nama, C.prod_id FROM so0 A
         left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id
         left join so10 C on A.so_num=C.so_num and A.co_id=C.co_id
         where A.co_id='$company' and A.status<>'0' ORDER BY A.so_num DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function SO_RptPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.cust_nama, C.prod_id FROM so0 A
         left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id
         left join so10 C on A.so_num=C.so_num and A.co_id=C.co_id
        where A.co_id='$company' ORDER BY A.so_num DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function SOPPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.cust_nama, C.prod_id FROM so0 A
         left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id
         left join so10 C on A.so_num=C.so_num and A.co_id=C.co_id
         where A.co_id='$company' and A.status='1' and
         not exists (select d.* from pp_detailproduksi d
              inner join pp_produksi e on d.co_id=e.co_id and d.no_pp=e.no_pp
              where d.co_id='$company' and d.so_num=a.so_num and e.status<>2)
         ORDER BY A.so_num DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT f0.*, sp.spesifikasi_nama, c.cust_nama
		             FROM formula0 f0
		             LEFT JOIN customer c ON c.cust_id = f0.cust_id and c.co_id = f0.co_id
		             LEFT JOIN spesifikasi sp ON sp.spesifikasi_id = f0.spesifikasi_id and sp.co_id = f0.co_id
		             where f0.co_id = '$company' and (f0.cust_id='$params->cust_id' or f0.cust_id= '') ORDER BY f0.formula_id ASC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id
		             where A.co_id='$company' ORDER BY $orderx DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id
		             where A.co_id='$company' and A.gdg_type='BM' ORDER BY A.timeedit DESC";
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
        $co_id= $_SESSION['user']['site'];
        $sql=("select * from GET_BARANGDALAMPROSES('$co_id')
        ");
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function GudangBDP_2Popup(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql=("select * from GET_BARANGDALAMPROSES_2('$co_id')
        ");
        $this->db->setSQL($sql);
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.description
		             FROM gudang A
		             LEFT JOIN pabrik_location B ON A.pabrik_sequence = B.pabrik_sequence and A.co_id = B.co_id
		             where A.co_id='$company' and A.gdg_type='BJ' ORDER BY A.timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, case vend_type when 'S' then 'Suplier' else 'Transporter' end as vend_type_desc
        FROM vendor A where A.co_id='$company' and A.vend_type='S' ORDER BY A.vend_id";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, case vend_type when 'S' then 'Suplier' else 'Transporter' end as vend_type_desc
        FROM vendor A where A.co_id='$company' and A.vend_type='T' ORDER BY A.vend_id";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * from pp_produksi where co_id='$company' ORDER BY timeedit DESC";
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

        $company =  $_SESSION['user']['site'];
        $sql ="select distinct A.po_num, A.tgl, A.vend_id, C.vend_nama, a.gudang_id
        from po0 A
        left join po1 A1 on A.po_num=A1.po_num and A.co_id=A1.co_id
        left join (
            select gr10.bb_id, gr10.co_id, gr0.po_num, sum(gr11.qty_netto) as qty from gr0
            inner join gr10 on gr0.gr_num=gr10.gr_num and gr0.co_id=gr10.co_id
            inner join gr11 on gr10.gr_num=gr11.gr_num and gr10.co_id=gr11.co_id and gr10.bb_id=gr11.bb_id
            where gr0.gr_type='R'
            group by gr10.bb_id, gr10.co_id, gr0.po_num)B on A.po_num=B.po_num and A.co_id=B.co_id and A1.bb_id=B.bb_id
        left join vendor C on A.vend_id=C.vend_id and A.co_id=C.co_id
        left join (
            select gr10.bb_id, gr10.co_id, gr0.po_num, sum(gr11.qty_netto) as qty from gr0
            inner join gr10 on gr0.gr_num=gr10.gr_num and gr0.co_id=gr10.co_id
            inner join gr11 on gr10.gr_num=gr11.gr_num and gr10.co_id=gr11.co_id and gr10.bb_id=gr11.bb_id
            where gr0.gr_type='B'
            group by gr10.bb_id, gr10.co_id, gr0.po_num)D on A.po_num=D.po_num and A.co_id=B.co_id and A1.bb_id=D.bb_id
        where A.co_id='$company' and (B.qty-coalesce(D.qty,0)) < A1.qty or B.qty is null and A.status=1 order by A.timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * from gr0 where co_id='$company' and status=1 and gr_type='R' and not exists (select * from ap_inv where gr_num=gr0.gr_num and status<>2)ORDER BY gr_num";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * from coa where co_id='$company' and status='Y' and aktif=1 ORDER BY coa_id";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.vend_nama FROM ap_inv_pembayaran A
        left join vendor B on A.vend_id=B.vend_id and A.co_id=B.co_id
        where A.co_id='$company' and A.inv_type ='U' and A.status=1 and A.saldo_akhir > 0
        and a.vend_id like '$params->vend_id'||'%'
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.vend_nama FROM ap_inv a
        left join vendor b on a.vend_id=b.vend_id and a.co_id=b.co_id
        where a.co_id='$company' and a.status=1 and a.hutangsuplier > 0
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
    public function getAP_Rptpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.vend_nama FROM ap_inv a
        left join vendor b on a.vend_id=b.vend_id and a.co_id=b.co_id
        where a.co_id='$company'
        ORDER BY a.timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM ap_inv
        where co_id='$company' and status=1 and not exists(select inv_code from ap_inv_pembayaran where inv_code=ap_inv.inv_code and status=1)
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.cust_nama FROM ar_sale a
        left join customer b on a.cust_id=b.cust_id and a.co_id=b.co_id
        where a.co_id='$company' and a.status=1 and a.piutangdebtor > 0 ORDER BY a.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAR_Rptpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.cust_nama FROM ar_sale a
        left join customer b on a.cust_id=b.cust_id and a.co_id=b.co_id
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
    public function getAR_LPIpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "        SELECT a.inv_code, cast(a.inv_date as date) as inv_date, cast(a.posted_date as date) as posted_date
        , a.cust_id, b.cust_nama, a.timeedit, a.piutangdebtor
        FROM ar_sale a
        left join customer b on a.cust_id=b.cust_id and a.co_id=b.co_id
        where a.co_id='SAM' and a.status=1 and a.co_id='$company' and a.piutangdebtor > 0

        union  all

        select a.inv_code, a.inv_date , a.posted_date, a.cust_id, b.cust_nama, a.timeedit , a.piutang_denda as piutangdebtor
        from ar_sale_interest a
        left join customer b on a.cust_id=b.cust_id and a.co_id=b.co_id
        where a.co_id='SAM' and a.status=1 and a.co_id='$company' and a.piutang_denda > 0";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM view_ar_cancelpopup
        where co_id='$company' order by timeedit DESC
        ";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.cust_nama FROM ar_sale_payment a
        left join customer b on a.co_id=b.co_id and a.cust_id=b.cust_id
        where a.co_id='$company' and a.inv_type ='U' and a.status=1 and a.saldo_akhir > 0
        and a.cust_id like '$params->cust_id'||'%'
        ORDER BY a.timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM ap_inv_pembayaran where co_id='$company' and inv_type ='N' and status=1 ORDER BY timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM ap_reclass where co_id='$company' and status=1 ORDER BY timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM inv_manufaktur
        where co_id='$company' and status=1
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM ar_sale_payment where co_id='$company' and  inv_type='N' and status=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getARDeduction(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM ar_sale_payment where co_id='$company' and inv_type='P' and status=1 ORDER BY timeedit DESC";
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
        $company =  $_SESSION['user']['site'];
        $sql = "select * from view_do_retur_ar where co_id='$company'
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
    public function getPB0(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM pb0
        where co_id='$company' and status=1 and not exists (select * from po0 where pb0.co_id=po0.co_id and pb0.pb_num=po0.pb_num)
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
    public function getTaxMPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM tax_m where co_id='$company' and type_tax='M' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getTaxKPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM tax_m where co_id='$company' and type_tax='K' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getCashbonOutPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.description as bank_nama FROM cashbook_in A
        left join bank_m B on A.bank_code=B.bank_code and A.co_id=B.co_id
        inner join cb_in_detail D on A.inv_code=D.inv_code
        where a.co_id='$company' and A.cb_type='O' and A.status=1 and not exists(select C.inv_code from cashbon C
        where C.inv_cb=A.inv_code
        )  and D.account=B.coa_cashbon
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
    public function getSODeliveryPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select * from view_so_do where co_id='$company'
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
    public function getRoutePopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM route where co_id='$company' and aktif=1 ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getReclassOVBpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.do_num, A.so_num, A.qty_do, E.inv_code, F.qty as qty_ar
        from deliveryorder A
        inner join(select sum(C.qty) as qty_ar, B.do_num, B.co_id from ar_sale B
        inner join ar_sale_detail C on B.inv_code=C.inv_code and B.co_id=C.co_id
        where B.status=1
        group by B.do_num, B.co_id) D on A.do_num=D.do_num and A.co_id=D.co_id
        left join ar_sale E on D.do_num=E.do_num and D.co_id=E.co_id
        inner join ar_sale_detail F on E.inv_code=F.inv_code and E.co_id=F.co_id
        where a.co_id='$company' and  A.qty_do=D.qty_ar and E.status=1 and E.reclass_status='N' ORDER BY E.inv_code DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getTaxDokinpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.inv_code, a.posted_date
                from ap_inv a
                where a.status=1 and a.co_id='$company'

                union all

                select b.inv_code, b.posted_date
                from cashbook_in b
                where b.status=1 and b.cb_type='O' and b.co_id='$company'

                union all

                select c.inv_code, c.posted_date
                from cashbook_bank c
                where c.status=1 and c.cb_type='O' and c.co_id='$company'";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getTaxDokoutpopup(stdClass $params)
    {
        $sql = "select a.inv_code, a.posted_date
                from ar_sale a
                where a.status=1

                union all

                select b.inv_code, b.posted_date
                from cashbook_in b
                where b.status=1 and b.cb_type='I'

                union all

                select c.inv_code, c.posted_date
                from cashbook_bank c
                where c.status=1 and c.cb_type='I'";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getStock_IN_OUTpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select *
        from view_pengembalian_stok_i
        where co_id='$company'
        order by timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getStock_Cancelpopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*
        from view_stock_cancel a
        where co_id='$company'
        order by a.dok_no ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getStock_OUTpopup(stdClass $params)
    {
        $sql = "select a.*
        from pinjaman_bb_bj a
        inner join (
            select sum(qty) as qty_pjmn, co_id, dok_no
            from pinjaman_bb_bj_detail
            group by co_id, dok_no
        )  b on a.co_id=b.co_id and a.dok_no=b.dok_no
        left join(
            select sum(x.qty) as qty_kbl, x.co_id, y.for_dok_no
            from pengembalian_bb_bj_detail x
            inner join pengembalian_bb_bj y on x.co_id=y.co_id and x.dok_no=y.dok_no
            group by x.co_id, y.for_dok_no
        ) c on a.dok_no=c.for_dok_no and a.co_id=c.co_id
        where a.status=1 and b.qty_pjmn > coalesce(c.qty_kbl,0) and a.dok_type='O'
        order by a.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function CFPopup(stdClass $params)
    {
        $sql = "SELECT * FROM cashflow ORDER BY cf_code ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function CF_IPopup(stdClass $params)
    {
        $sql = "SELECT * FROM cashflow where cf_type='I' ORDER BY cf_code ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function CF_OPopup(stdClass $params)
    {
        $sql = "SELECT * FROM cashflow where cf_type='O' ORDER BY cf_code ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function PO_rptPopup(stdClass $params)
    {
        $sql = "SELECT * FROM po0 where status=1 ORDER BY timeedit ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function getGLADpopup(stdClass $params)
    {
        $sql = "select * from View_Voucher_GL_AD
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
    public function getKBKpopup(stdClass $params)
    {
        $sql = "select * from View_Voucher_KasBankKeluar
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
    public function getKBMpopup(stdClass $params)
    {
        $sql = "select * from View_Voucher_KasBankMasuk
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
    public function PPDPopup(stdClass $params)
    {
        $sql = "select a.*, c.cust_nama from pp_detailproduksi a
        left join so0 b on a.so_num=b.so_num and a.co_id=b.co_id
        left join customer c on b.cust_id=c.cust_id and b.co_id=c.co_id
        ORDER BY a.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getPB_rptPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM pb0 where co_id='$company'
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
    public function getKapal(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM vessel where co_id='$company'
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
    public function getSPKirim(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM sp_kirim where co_id='$company'
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
    public function getStockOpname(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.bb_nama
        FROM inventory_bb a
        left join bahanbaku b on a.co_id=b.co_id and a.bb_id=b.bb_id
        where a.co_id='$company' and periode='$params->periode' and gudang_id='$params->gudang_id'
        ORDER BY a.periode ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getStockOpnameBJ(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.prod_nama
        FROM rpt_stock_bj('$params->gudang_id','$params->periode','$company') a
        left join items b on a.co_id=b.co_id and a.prod_id=b.prod_id
        ORDER BY a.prod_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getCBPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT *
        FROM cashbook_in
        where co_id='$company' and cb_type='$params->cb_type' and status=1
        ORDER BY inv_code ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getAPPaymentCancel(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*
        FROM ap_inv_pembayaran a
        where a.co_id='$company' and a.inv_type='$params->inv_type' and a.status=1 and not exists (select * from ap_inv_pembayaran where co_id=a.co_id and inv_um=a.ap_inv_payment and status=1)
        ORDER BY ap_inv_payment ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getARPaymentCancel(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*
        FROM ar_sale_payment a
        where a.co_id='$company' and a.inv_type='$params->inv_type' and a.status=1 and not exists (select * from ar_sale_payment where co_id=a.co_id and inv_um=a.inv_code and status=1  )
        ORDER BY inv_code ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getCB_BankPopup(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT *
        FROM cashbook_bank
        where co_id='$company' and cb_type='$params->cb_type' and status=1
        ORDER BY inv_code ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
}
