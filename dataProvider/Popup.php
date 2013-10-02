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
         left join so10 C on A.so_num=C.so_num and A.co_id=C.co_id
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
    public function SOPPopup(stdClass $params)
    {

        $sql = "SELECT A.*, B.cust_nama, C.prod_id FROM so0 A
         left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id
         left join so10 C on A.so_num=C.so_num and A.co_id=C.co_id
         where A.status='B' ORDER BY A.so_num DESC";
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
            where gr0.gr_type='R'
            group by gr10.bb_id, gr10.co_id, gr0.po_num)B on A.po_num=B.po_num and A.co_id=B.co_id and A1.bb_id=B.bb_id
        left join vendor C on A.vend_id=C.vend_id and A.co_id=C.co_id
        left join (
            select gr10.bb_id, gr10.co_id, gr0.po_num, sum(gr11.qty_netto) as qty from gr0
            inner join gr10 on gr0.gr_num=gr10.gr_num and gr0.co_id=gr10.co_id
            inner join gr11 on gr10.gr_num=gr11.gr_num and gr10.co_id=gr11.co_id and gr10.bb_id=gr11.bb_id
            where gr0.gr_type='B'
            group by gr10.bb_id, gr10.co_id, gr0.po_num)D on A.po_num=D.po_num and A.co_id=B.co_id and A1.bb_id=D.bb_id
        where (B.qty-coalesce(D.qty,0)) < A1.qty or B.qty is null and A.status=1 order by A.timeedit DESC";
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

        $sql = "SELECT * from gr0 where status=1 and gr_type='R' and not exists (select * from ap_inv where gr_num=gr0.gr_num and status<>2)ORDER BY gr_num";
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

        $sql = "SELECT * FROM ap_inv where status=1 and hutangsuplier > 0
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
    public function getARPayUMCancelpopup(stdClass $params)
    {

        $sql = "SELECT A.* FROM ar_sale_payment A where A.inv_type ='U' and A.status=1
        and not exists(select inv_um from ar_sale_payment where inv_um=A.inv_code and status=1)
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

        $sql = "select o.*
        from deliveryorder o
        left join (select co_id, for_do_num, sum(qty_do) as qty_doreturn
                  from deliveryorder where do_type='R'
                  group by co_id, for_do_num
        ) p on o.co_id=p.co_id and o.do_num=p.for_do_num
        where o.do_type='N'
        and not exists (select * from ar_sale where do_num=o.do_num and status<>2)
        ORDER BY o.timeedit DESC";
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

        $sql = "SELECT * FROM pb0
        where not exists (select * from po0 where pb0.co_id=po0.co_id and pb0.pb_num=po0.pb_num)
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
        $sql = "SELECT * FROM tax_m where type_tax='M' ORDER BY timeedit DESC";
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
        $sql = "SELECT * FROM tax_m where type_tax='K' ORDER BY timeedit DESC";
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
        $sql = "SELECT A.*, B.description as bank_nama FROM cashbook_in A
        left join bank_m B on A.bank_code=B.bank_code and A.co_id=B.co_id
        inner join cb_in_detail D on A.inv_code=D.inv_code
        where A.cb_type='O' and A.status=1 and not exists(select C.inv_code from cashbon C
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

        $sql = "select * from so10 A
        where not exists (select * from delivery where so_num=A.so_num and prod_id=A.prod_id and qty_do < A.qty)
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
    public function getRoutePopup(stdClass $params)
    {
        $sql = "SELECT * FROM route ORDER BY timeedit DESC";
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
        $sql = "select A.do_num, A.so_num, A.qty_do, E.inv_code, F.qty as qty_ar
        from deliveryorder A
        inner join(select sum(C.qty) as qty_ar, B.do_num, B.co_id from ar_sale B
        inner join ar_sale_detail C on B.inv_code=C.inv_code and B.co_id=C.co_id
        where B.status=1
        group by B.do_num, B.co_id) D on A.do_num=D.do_num and A.co_id=D.co_id
        left join ar_sale E on D.do_num=E.do_num and D.co_id=E.co_id
        inner join ar_sale_detail F on E.inv_code=F.inv_code and E.co_id=F.co_id
        where A.qty_do=D.qty_ar and E.status=1 and E.reclass_status='N' ORDER BY E.inv_code DESC";
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
        $sql = "select a.inv_code, a.posted_date
                from ap_inv a
                where a.status=1

                union all

                select b.inv_code, b.posted_date
                from cashbook_in b
                where b.status=1 and b.cb_type='O'

                union all

                select c.inv_code, c.posted_date
                from cashbook_bank c
                where c.status=1 and c.cb_type='O'";
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
        $sql = "SELECT * FROM PINJAMAN_BB_BJ ORDER BY timeedit DESC";
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
        $sql = "SELECT * FROM gr0 ORDER BY timeedit ASC";
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

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */

}
