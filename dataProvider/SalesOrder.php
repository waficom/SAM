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

class SalesOrder
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

	/**
	 * Function: getFilterEncountersBillingData
	 * The first call to populate the dataGrid on the Billing panel
	 * also it will be used to filter the data by passing parameters
	 * from extjs.
	 */
	public function getFilterSOData(stdClass $params)
	{
		// Declare all the variables that we are going to use.
		(string)$whereClause = '';
		(array)$salesorder = '';
		(int)$total = 0;
		(string)$sql = '';

//        error_reporting(-1);
		// Look between service date
		
		if ($params->datefrom && $params->dateto)
//			$whereClause .= chr(13) . " AND so0.tanggal BETWEEN '" . substr($params->datefrom, 0, -9) . " 00:00:00' AND '" . substr($params->dateto, 0, -9) . " 23:59:59'";
            $whereClause .= chr(13) . " AND so0.tanggal BETWEEN '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'" ;

		if ($params->so_numsearch)
			$whereClause .= chr(13) . " AND so0.so_num like '%" . $params->so_numsearch . "%'";

        if ($params->cust_search)
            $whereClause .= chr(13) . " AND customer.cust_nama like '%" . $params->cust_search . "%'";

		// Eliminate the first 6 characters of the where clause
		// this to eliminate and extra AND from the SQL statement
		$whereClause = substr($whereClause, 6);

		// If the whereClause variable is used go ahead and
		// and add the where command.
		if ($whereClause)
			$whereClause = 'WHERE ' . $whereClause;

		$sql = "SELECT so0.*, customer.cust_nama
				FROM
					so0
				LEFT JOIN
					customer 
				ON customer.cust_id = so0.cust_id
				$whereClause
				ORDER BY
				     so_num";
		$this->db->setSQL($sql);

		foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
		{
            $row = array_change_key_case($row);
			$salesorder[] = $row;
		}

		$total = count($salesorder);
//		$salesorder = array_slice($salesorder, $params->start, $params->limit);
//		echo $sql;
//		echo $salesorder;
		return array(
			'totals' => $total,
			'salesorder' => $salesorder
		);

	}
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addSO(stdClass $params)
    {
        $data = get_object_vars($params);

        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['cust_po_tgl'] = $this->db->Date_Converter($data['cust_po_tgl']);
        $data['tgl_jt_kirim'] = $this->db->Date_Converter($data['tgl_jt_kirim']);
        $data['released_date'] = $this->db->Date_Converter($data['released_date']);
        if (is_null($data['ppn_so']) || ($data['ppn_so'] == '')) {
            $data['ppn_so'] = '0';
        }
        if (is_null($data['ppn_exc']) || ($data['ppn_exc'] == '')) {
            $data['ppn_exc'] = '0';
        }
        if (is_null($data['released']) || ($data['released'] == '')) {
            $data['released'] = '0';
        }

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['cust_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'so0', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateSO(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['so_num'], $data['id'], $data['cust_nama'], $data['co_id']);
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['cust_po_tgl'] = $this->db->Date_Converter($data['cust_po_tgl']);
        $data['tgl_jt_kirim'] = $this->db->Date_Converter($data['tgl_jt_kirim']);
        $data['released_date'] = $this->db->Date_Converter($data['released_date']);
        if (is_null($data['ppn_so']) || ($data['ppn_so'] == '')) {
            $data['ppn_so'] = '0';
        }
        if (is_null($data['ppn_exc']) || ($data['ppn_exc'] == '')) {
            $data['ppn_exc'] = '0';
        }
        if (is_null($data['released']) || ($data['released'] == '')) {
            $data['released'] = '0';
        }
        $cond = array('co_id' =>$params->co_id, 'so_num' => $params->so_num);
        $sql = $this -> db -> sqlBind($data, 'so0', 'U', $cond);
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
    public function deleteSO(stdClass $params)
    {
        $data = get_object_vars($params);
//        $sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> old_co_id));
        $sql = "DELETE FROM SO11 WHERE (co_id = '$params->co_id') and (so_num = '$params -> so_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM SO10 WHERE (co_id = '$params->co_id') and (so_num = '$params -> so_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
		$sql = "DELETE FROM SO0 WHERE (co_id = '$params->co_id') and (so_num = '$params -> so_num')";
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
    public function deletebyso_num($cid, $num)
    {
        $sql = "DELETE FROM SO11 WHERE (co_id = '$cid') and (so_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM SO10 WHERE (co_id = '$cid') and (so_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM SO0 WHERE (co_id = '$cid') and (so_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $num;
    }

    public function getSOItems(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$soitems = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND so10.co_id = '" . $params->co_id . "'";
        $whereClause .= chr(13) . " AND so10.so_num = '" . $params->so_num . "'";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    so10.co_id,
                    so10.so_num,
                    so10.prod_id,
                    so10.sat_id,
                    so10.qty,
                    so10.hrg,
                    so10.n_brutto,
                    so10.disc_prs,
                    so10.n_disc,
                    so10.n_netto,
                    so10.keterangan,
                    so10.hrg_loco,
                    so10.hrg_transport,
                    so10.hrg_promosi,
                    so10.hrg_sosialisasi,
                    so10.hrg_lain,
                    items.prod_nama,
                    satuan.satuan_nama
                from so10
                   left outer join items on (so10.prod_id = items.prod_id) and (so10.co_id = items.co_id)
                   left outer join satuan on (so10.co_id = satuan.co_id) and (so10.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     prod_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $soitems[] = $row;
        }

        $total = count($soitems);
        return array(
            'totals' => $total,
            'soitems' => $soitems
        );

    }
    public function addSOItems(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'so10', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateSOItems(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['prod_nama'], $data['id'], $data['satuan_nama'], $data['old_prod_id']);
        $cond = array('co_id' =>$params->co_id, 'so_num' => $params->so_num, 'prod_id' => $params->old_prod_id);
        $sql = $this -> db -> sqlBind($data, 'so10', 'U', $cond);
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
    public function deleteSOItems(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM SO10 WHERE so_num = '". $params -> so_num . "'";
        $sql .= "AND co_id = '" . $params->co_id . "'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getSOLocation(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$soitems = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND so10.co_id = '" . $params->co_id . "'";
        $whereClause .= chr(13) . " AND so10.so_num = '" . $params->so_num . "'";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    so11.co_id,
                    so11.so_num,
                    so11.prod_id,
                    so11.urut,
                    so11.lokasi_nama,
                    so11.lokasi_kec,
                    so11.lokasi_kab,
                    so11.qty,
                    so11.sat_id,
                    so11.keterangan,
                    items.prod_nama,
                    satuan.satuan_nama
                from so11
                   left outer join items on (so11.co_id = items.co_id) and (so11.prod_id = items.prod_id)
                   left outer join satuan on (so11.co_id = satuan.co_id) and (so11.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     lokasi_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $soitems[] = $row;
        }

        $total = count($soitems);
        return array(
            'totals' => $total,
            'soitems' => $soitems
        );

    }
    public function addSOLocation(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'so11', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateSOLocation(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $cond = array('co_id' =>$params->co_id, 'so_num' => $params->so_num, 'prod_id' => $params->prod_id);
        $sql = $this -> db -> sqlBind($data, 'so11', 'U', $cond);
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
    public function deleteSOLocation(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM SO11 WHERE so_num = '". $params -> so_num . "'";
        $sql .= "AND co_id = '" . $params->co_id . "'";
        $sql .= "AND prod_id = '" . $params->prod_id . "'";
        $sql .= "AND urut = ".$params->urut;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function updateSOnetto(stdClass $params)
    {
        $sql = "SELECT sum(n_bruto) as sum_n_bruto, sum(n_disc) as sum_n_disc, sum(n_netto) as sum_n_netto from so10
                WHERE (co_id = '$params->co_id') and (so_num = '$params->so_num')";
        $this->db->setSQL($sql);
        $row = $this->db->fetchRecord();
        $row = array_change_key_case($row);
        $sql = "UPDATE so0
                SET n_bruto = $row->sum_n_bruto,
                    n_disc = $row->sum_n_disc,
                    n_netto = $row->sum_n_netto
                WHERE (co_id = $params->co_id) and (so_num = '$params->so_num')";
        $this->db->setSQL($sql);
        $this->db->execOnly(false);
    }

}
