<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Ernesto J Rodriguez
 * Date: 7/11/12
 * Time: 12:03 PM
 * To change this template use File | Settings | File Templates.
 */
if(!isset($_SESSION)){
	session_name('GaiaEHR');
	session_start();
	session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');
include_once ($_SESSION['root'] . '/classes/Crypt.php');
class Sessions
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
		$this->db = new dbHelper();
		return;
	}

	public function loginSession()
	{
		$date                  = time();
		$data['sid']           = session_id();
		$data['uid']           = $_SESSION['user']['id'];
		$data['login']         = $date;
		$data['last_request	'] = $date;
		$this->db->setSQL($this->db->sqlBind($data, 'users_sessions', 'I'));
		$this->db->execLog();
		$this->db->setSQL("select first 1 id from users_sessions where sid = '" . $data['sid'] ."'");
		$r = $this->db->fetchRecord(PDO::FETCH_ASSOC);
		$this->db->lastInsertId = $r['ID'];
		$_SESSION['session_id'] = $this->db->lastInsertId;
		return $_SESSION['session_id'];
	}

	public function setSessionByToken($token)
	{
		$s = json_decode(Crypt::decrypt($token));
		$this->db->setSQL("SELECT s.id AS sid, s.uid AS uid, u.lname, u.fname, u.email
							 FROM users_sessions s
						LEFT JOIN users u ON s.uid = u.id
							WHERE s.id = '$s->sid' AND s.logout IS NULL");
		$r = $this->db->fetchRecord(PDO::FETCH_ASSOC);
		if(!empty($r)){
			$_SESSION['user']['name']  = $r['FNAME'] . ", " . $r['LNAME'];
			$_SESSION['user']['id']    = $r['UID'];
			$_SESSION['user']['email'] = $r['EMAIL'];
			$_SESSION['user']['site']  = $s->site;
			$_SESSION['user']['auth']  = true;
			return true;
		}else{
			return false;
		}
	}

	public function updateSession()
	{
		$_SESSION['inactive']['timeout'] = time();
		$data['last_request']        = $_SESSION['inactive']['timeout'];
		$this->db->setSQL($this->db->sqlBind($data, 'users_sessions', 'U', array('id' => $_SESSION['session_id'])));
		$this->db->execOnly();
		return true;
	}

	public function logoutSession()
	{
		$data['logout'] = time();
		$this->db->setSQL($this->db->sqlBind($data, 'users_sessions', 'U', array('id' => $_SESSION['session_id'])));
		$this->db->execOnly();
		return true;
	}

	public function logoutInactiveUsers()
	{
		$now   = time();
		$foo   = $now - $_SESSION['inactive']['time'];
		$users = array();
		$this->db->setSQL("SELECT id, uid FROM users_sessions WHERE last_request < $foo AND logout IS NULL");
		foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) as $user){
			$id      = $user['ID'];
			$users[] = array('uid' => $user['UID']);
			$this->db->setSQL("UPDATE users_sessions SET logout = $now WHERE id = $id");
			$this->db->execOnly();
		}
		return $users;
	}

}
