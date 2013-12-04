<?php
/*
 GaiaEHR (Electronic Health Records)
 Fees.php
 Fees dataProvider
 Copyright (C) 2012 Certun, Inc.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see
 <http://www.gnu.org/licenses/>
 .
 */

if (!isset($_SESSION))
{
    session_name("GaiaEHR");
    session_start();
    session_cache_limiter('private');
}

include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class GoodsReceived
{
    /**
     * @var dbHelper
     */
    private $db;

    function __construct()
    {
        // Declare all the variables that we are gone to use
        // within the class.
        (object)$this->db = new dbHelper();
        return;
    }


    public function getFilterGRData(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, d.vend_nama, b.vend_nama as vend_tr_nama, c.gudang_nama, e.description as pabrik
        from gr0 a
        left join vendor b on a.vend_id_trans=b.vend_id and a.co_id=b.co_id
        left join gudang c on a.gudang_id=c.gudang_id and a.co_id=c.co_id
        left join vendor d on a.vend_id=d.vend_id and a.co_id=d.co_id
        left join pabrik_location e on c.pabrik_sequence=e.pabrik_sequence and c.co_id=e.co_id
        where a.co_id='$company' and a.gr_type='R'
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
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addGR(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinsert= $_SESSION['user']['name'];
        $sql=("execute procedure goods_received_i '$userinsert','$params->po_num','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }

    public function updateGR(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql=("execute procedure goods_received_u
        '$params->keterangan',
        '$params->gudang_id',
        '$params->rc_type',
        '$params->vend_id_trans',
        '$params->vend_id',
        '$params->grn_return',
        '$params->gr_type',
        '$params->po_num',
        '$params->gr_num',
        '$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function updateGRItems(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $posted_by= $_SESSION['user']['name'];
        $posted_date =  $this->db->Date_Converter($params->posted_date);
        $sql=("execute procedure goods_received_p
        '$posted_by',
        '$posted_date',
        '$params->gr_num',
        '$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }


    public function deleteGR(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM jurnal WHERE (co_id = '$company') and (inv_code = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr11 WHERE (co_id = '$company') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr10 WHERE (co_id = '$company') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr0 WHERE (co_id = '$company') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */

    public function getGRItems(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.co_id,a.gr_num,a.bb_id, a.sat_id,a.qty_brutto,a.qty_netto,a.qty_pcs,
        a.qty_brutto -  a.qty_netto  as qty_selisih,a.keterangan, f.qty - coalesce(c.qty_grn - coalesce(qty_return,0),0) as qtygrn , e.bb_nama, f.qty as qty_po
        , g.nopol, g.do_num, g.qty_brutto, g.qty_netto, g.qty_pcs
        from gr10 a
        left join gr0 b on a.co_id=b.co_id and a.gr_num=b.gr_num
        left join(
            select sum(c.qty_netto) as qty_grn, c.bb_id, c.sat_id, d.po_num, c.co_id
            from gr10 c
            left join gr0 d on c.co_id=d.co_id and c.gr_num=d.gr_num
            where d.status=1 and d.gr_type='R'
            group by c.co_id, c.bb_id, c.sat_id, d.po_num
        ) c on b.po_num=c.po_num and a.co_id=c.co_id and a.bb_id=c.bb_id and a.sat_id=c.sat_id
         left join(
            select sum(c.qty_netto) as qty_return, c.bb_id, c.sat_id, d.po_num, c.co_id
            from gr10 c
            left join gr0 d on c.co_id=d.co_id and c.gr_num=d.gr_num
            where d.status=1 and d.gr_type='B'
            group by c.co_id, c.bb_id, c.sat_id, d.po_num
        ) d on b.po_num=d.po_num and a.co_id=d.co_id and a.bb_id=d.bb_id and a.sat_id=d.sat_id
        left join bahanbaku e on a.bb_id=e.bb_id and a.co_id=e.co_id
        left join po1 f on b.po_num=f.po_num and a.bb_id=f.bb_id and a.sat_id=f.sat_id
        left join gr11 g on a.co_id=g.co_id and a.bb_id=g.bb_id and a.sat_id=g.sat_id  and a.gr_num=g.gr_num
        where a.co_id='$company' and a.gr_num='$params->gr_num' order by a.bb_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function addGRItems(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['bb_nama'], $data['id'], $data['sat_nama'], $data['old_bb_id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'gr10', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    /*public function updateGRItems(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['bb_nama'], $data['id'], $data['sat_nama'], $data['qty_po'], $data['old_bb_id']);
        $cond = array('co_id' =>$params->co_id, 'gr_num' => $params->gr_num, 'bb_id' => $params->old_bb_id);
        $sql = $this -> db -> sqlBind($data, 'gr10', 'U', $cond);
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $params->old_co_id = $params->co_id;
        return $params;
    }*/

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteGRItems(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM GR10 WHERE gr_num = '$params->gr_num' AND co_id = '$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getGRDetail(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'urut';
        }
        $sql = "select * from gr11 WHERE gr_num = '$params->gr_num' AND co_id = '$params->co_id' and  bb_id = '$params->bb_id' and  sat_id = '$params->sat_id'
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
    public function addGRDetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql=("execute procedure goods_received_detail_i  '$params->do_num','$params->nopol','$params->sat_id','$params->keterangan',
        $params->qty_pcs,$params->qty_netto, $params->qty_po,'$params->bb_id','$params->gr_num','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGRDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['bb_id'], $data['urut'], $data['gr_num']);
        $cond = array('co_id' =>$params->co_id, 'gr_num' => $params->gr_num, 'bb_id' => $params->bb_id, 'urut' => $params->urut);
        $sql = $this -> db -> sqlBind($data, 'gr11', 'U', $cond);

        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $params->old_co_id = $params->co_id;
        return $params;
    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteGRDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM GR11 WHERE gr_num = '$params->gr_num' and co_id = '$params->co_id'
                and bb_id = '$params->bb_id' and sat_id = '$params->sat_id' and urut = " . $params->urut;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}
