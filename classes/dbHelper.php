<?php
/**
 * @brief       Database Helper Class.
 * @details     A PDO helper for GaiaEHR, contains custom function to manage the
 * database
 *              in GaiaEHR. PDO is new in PHP v5.
 *
 *              The PHP Data Objects (PDO) extension defines a lightweight,
 *              consistent interface for accessing databases in PHP.
 *              Each database driver that implements the PDO interface can expose
 * database-specific
 *              features as regular extension functions. Note that you cannot
 * perform any database
 *              functions using the PDO extension by itself;
 *              you must use a database-specific PDO driver to access a database
 * server.
 *
 *              PDO provides a data-access abstraction layer, which means that,
 *              regardless of which database you're using, you use the same
 * functions to issue queries
 *              and fetch data. PDO does not provide a database abstraction; it
 * does not rewrite
 *              SQL or emulate missing features.
 *              You should use a full-blown abstraction layer if you need that
 * facility.
 *
 *              PDO ships with PHP 5.1, and is available as a PECL extension for
 * PHP 5.0;
 *              PDO requires the new OO features in the core of PHP 5, and so
 * will not
 *              run with earlier versions of PHP.
 *
 * @author      Gino Rivera (Certun) <grivera@certun.com>
 * @author      Ernesto J. Rodriguez (Certun) <erodriguez@certun.com>
 * @version     Vega 1.2
 * @copyright   Gnu Public License (GPLv3)
 *
 */
if (!isset($_SESSION))
{
	session_name('GaiaEHR');
	session_start();
	session_cache_limiter('private');
}

ini_set('max_input_time', '2500');
ini_set('max_execution_time', '2500');
$timezone = (isset($_SESSION['site']['timezone']) ? $_SESSION['site']['timezone'] : 'UTC');
date_default_timezone_set($timezone);
include_once ($_SESSION['root'] . '/classes/Time.php');
require_once($_SESSION['root'] . '/classes/pdo_database.class.php');

class dbHelper
{
    public $_custom_log;
	/**
	 * @var
	 */
	public $sql_statement;
	/**
	 * @var
	 */
	public $lastInsertId;
	/**
	 * @var PDO
	 */
	public $conn;
	/**
	 * @var string
	 */
    public $dbx;
    /**
     * @var string
     */
	private $err;

	/**
	 * MicroORM related variables
	 */
	private $workingTable;
	private $workingFields;
	private $workingDatabase;

	/**
	 * @brief       dbHelper constructor.
	 * @details     This method starts the connection with mysql server using
	 * $_SESSION values
	 *              during the login process.
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 */
	function __construct()
	{
		error_reporting(0);
		if (isset($_SESSION['site']['db']))
		{

			$dbtype = (string)$_SESSION['site']['db']['type'];
			$host = (string)$_SESSION['site']['db']['host'];
			$port = (int)$_SESSION['site']['db']['port'];
			$dbName = (string)$_SESSION['site']['db']['database'];
			$dbUser = (string)$_SESSION['site']['db']['username'];
			$dbPass = (string)$_SESSION['site']['db']['password'];
			
			try
			{
/*				if ($dbtype = 'mysql')
				{	
					$this->conn = new PDO('mysql:host=' . $host . ';port=' . $port . ';dbname=' . $dbName, $dbUser, $dbPass, array(
						PDO::MYSQL_ATTR_LOCAL_INFILE => 1,
						PDO::ATTR_PERSISTENT => true
					)); 
				}
*/
//				else if ($dbtype = 'firebird') {
//					$this->conn = new PDO("firebird:dbname=" . $host . ":" . $dbName, $dbUser, $dbPass);					
/*					$params = array(
						'type' => 'firebird',
						'host' => $host,
						'user' => $dbUser,
						'pass' => $dbPass,		
						// Only required
						// SQLite or Firebird
						'file' => $dbName
					);
					$this->conn = Query($params);
*/
				# object = new wArLeY_DBMS(shortcut_database_type, server, database_name, user, password, port);
				$dbx = new wArLeY_DBMS($dbtype, $host, $dbName, $dbUser, $dbPass, $port);
				///3.- Connect to database.
				$this->conn = $dbx->Cnxn(); //This step is really neccesary for create connection to database, and getting the errors in methods.
				
				///4.- Check if connection are succesful or return error.
				if($this->conn==false) die("Error: Cant connect to database.");
				
				///5.- If connection fail you can print the error... Note: Every operation you execute can try print this line, for get the latest error ocurred.
				echo $dbx->getError(); //Show error description if exist, else is empty.
					
//				}
			}
			catch(PDOException $e)
			{
				$this->err = $e->getMessage();
			}
		}
	}

	/**
	 * @brief       Set the SQL Statement.
	 * @details     This method set the SQL statement in
	 *              $this->sql_statement for other methods to use it
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @see         Logs::getLogs() for basic example and
	 * Patient::patientLiveSearch() for advance example.
	 *
	 * @param       $sql string statement to set
	 */
	public function setSQL($sql)
	{
		$this->sql_statement = $sql;
	}

	/**
	 * @brief       SQL Bind.
	 * @details     This method is used to INSERT and UPDATE the database.
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @note        To eliminate fields that are not in the database you can use
	 * unset($b_array['field']);
	 * @warning     To UPDATE you can NOT pass the ID in the $b_array.
	 *              Make user to unset the ID before calling this method.
	 *
	 * @see         User::addUser() for Add example and  User::updateUser() for
	 * Update example.
	 *
	 * @param       array  $BindFieldsArray  containing a key that has to be the
	 * exact field on the data base, and it's value
	 * @param       string $Table            A valid database table to make the SQL
	 * statement
	 * @param       string $InsertOrUpdate   Insert or Update parameter. This has to
	 * options I = Insert, U = Update
	 * @param              $Where
	 * @return      string constructed SQL string
	 */
	public function sqlBind($BindFieldsArray, $Table, $InsertOrUpdate = 'I', $Where = null)
	{
/*
		if (isset($BindFieldsArray['__utma']))
			unset($BindFieldsArray['__utma']);
		if (isset($BindFieldsArray['__utmz']))
			unset($BindFieldsArray['__utmz']);
		if (isset($BindFieldsArray['GaiaEHR']))
			unset($BindFieldsArray['GaiaEHR']);
*/
		/**
		 * Step 1 -  Create the INSERT or UPDATE Clause
		 */
		$InsertOrUpdate = strtolower($InsertOrUpdate);
		if ($InsertOrUpdate == 'i')
		{
			$sql = "INSERT INTO " . $Table ;
		}
		elseif ($InsertOrUpdate == 'u')
		{
			$sql = "UPDATE " . $Table ;
		}
		else
			return "No update or insert command.";
		/**
		 * Step 2 -  Create the SET clause
		 */
		if ($InsertOrUpdate == 'i')
		{
			$sql .= "(";
			$count = 0;
			foreach ($BindFieldsArray as $key => $key)
			{
				$and = ($count == 0) ? "" : ", ";
				$sql .= $and . $key;
				$count++;
			}
//			$sql = substr($sql, 0, -2);		
			$sql .= ") VALUES (";
			$count = 0;
			foreach ($BindFieldsArray as $key => $value)
			{
				$koma = ($count == 0) ? "" : ", ";
				$n = "";
				
				if ($value == null || $value === 'null')
				{
					$n = "NULL";
				}
				else
				{
					if (gettype($value) == 'string')
					{
						$value = addslashes($value);
					}
 					$n = gettype($value) == 'string' ? "'$value'" : "$value";
				}
				$sql .= $koma . $n;
				$count++;
			}
//			$sql = substr($sql, 0, -2);					
			$sql .= ")";			
		}
		elseif ($InsertOrUpdate == 'u')
		{
			$sql .= " SET ";
			foreach ($BindFieldsArray as $key => $value)
			{
//				$value = addslashes($value);
				if (isset($Where) && is_array($Where))
				{
//					if (!array_key_exists($key, $Where))
//					{
						if ($value == null || $value === 'null')
						{
							$sql .= $key . "=NULL, ";
						}
						else
						{
							$value = gettype($value) == 'string' ? "'$value'" : $value;
							$value = preg_replace('/([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2})/i', '${1} ${2}', trim($value));
							$sql .= $key . "=$value, ";
						}
//					}
//					else
//					{
//						return array(
//							'success' => false,
//							'error' => 'Where value can not be updated. please make sure to unset it from the array'
//						);
//					}
				}
				else
				{
					// TODO: remove this... after new version (above) is implemented throughout the
					// application
//					if ($Where <> ($key . "='$value'") && $Where <> ($key . '=' . $value) && $Where <> ($key . '="' . $value . '"'))
//					{
						if ($value == null || $value === 'null')
						{
							$sql .= $key. "=NULL, ";
						}
						else
						{
							$value = gettype($value) == 'string' ? "'$value'" : $value;
							$value = preg_replace('/([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2})/i', '${1} ${2}', trim($value));
							$sql .= $key . "=$value, ";
						}
//					}
//					else
//					{
//						return array(
//							'success' => false,
//							'error' => 'Where value can not be updated. please make sure to unset it from the array'
//						);
//					}
				}
	
			}
		$sql = substr($sql, 0, -2);
		}
		/**
		 * Step 3 - Create the WHERE clause, if applicable
		 */
		if ($InsertOrUpdate == 'u' && $Where != null)
		{
			$sql .= " WHERE ";
			if (is_array($Where))
			{
				$count = 0;
				foreach ($Where as $key => $val)
				{
					$and = ($count == 0) ? "" : " AND ";
					$val = gettype($val) == 'string' ? "'$val'" : $val;
					
					$sql .= $and . $key . "=" . $val ;
					$count++;
				}
			}
			else
			{
				$sql .= $Where;
			}
		}
		/**
		 * Step 4 - return the sql statement
		 */
		return $sql;
	}

	/**
	 * @brief    SQL Select Builder.
	 * @details  This method is used to build Select statements for MySQL.
	 *
	 * @author   Gino Rivera (Certun) <grivera@certun.com>
	 * @version  Vega 1.0
	 *
	 * @param       $Table
	 * @param array $Fields
	 * @param null  $Where
	 * @param null  $Order
	 * @internal param $ (array)$Fields
	 * @internal param $ (array)$Order
	 * @internal param $ (array)$Where
	 * @return string
	 */
	public function sqlSelectBuilder($Table, $Fields = array('*'), $Where = null, $Order = null)
	{
		// Step 1 - Select clause and wrote down the fields
		$sqlReturn = 'SELECT ';
		foreach ($Fields as $key => $value)
			$sqlReturn .= $value . ', ';
		$sqlReturn = substr($sqlReturn, 0, -2);
		// Step 2 - From clause, table
		$sqlReturn .= ' FROM ' . $Table . ' ';
		// Step 3 - Having clause, filter the records
		if ($Where != null)
		{
			$sqlReturn .= ' HAVING ';
			foreach ($Where as $key => $value)
			{
				$sqlReturn .= '(' . $value . ')';
				$sqlReturn .= (is_int($key)) ? ' AND ' : ' ' . $key . ' ';
			}
			$sqlReturn = substr($sqlReturn, 0, -5);
		}
		// Step 4 - Order clause, sort the results
		if ($Order != null)
		{
			$sqlReturn .= ' ORDER BY ';
			foreach ($Order as $key => $value)
			{
				$sqlReturn .= (!is_int($key)) ? $value . ' ' . $key . ', ' : $value . ', ';
			}
			$sqlReturn = substr($sqlReturn, 0, -2);
		}
		return $sqlReturn;
	}

	/**
	 * @brief       Execute Statement "WITHOUT" returning records
	 * @details     Simple exec SQL Statement, with no Event LOG injection.
	 *              For example to execute an ALTER a table.
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @param       bool $setLastInsertId
	 * @return      array Connection error info if any
	 */
	public function execOnly($setLastInsertId = true)
	{
		$this->conn->query($this->sql_statement);
		if ($setLastInsertId)
		{
//			$this->lastInsertId = $this->conn->lastInsertId();
			
		}
		return $this->conn->errorInfo();
	}

	/**
	 * @brief       Execute Log.
	 * @details     This method is used to INSERT, UPDATE, DELETE, and ALTER the
	 * database.
	 *              with a event log injection.
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @note        The Log Injection is automatic It tries to detect an insert,
	 * delete, alter and log the event
	 *
	 * @see         User::addUser() for Add example.
	 *
	 * @return      array Connection error info if any
	 */
	function execLog()
	{
		/**
		 * Execute the sql statement
		 */
		$this->conn->query($this->sql_statement);
		if (stristr($this->sql_statement, 'INSERT') || stristr($this->sql_statement, 'DELETE') || stristr($this->sql_statement, 'UPDATE') || stristr($this->sql_statement, 'LOAD') || stristr($this->sql_statement, 'ALTER'))
		{
//			$this->lastInsertId = $this->conn->lastInsertId();
			$eventLog = "Event triggered but never defined.";
			if (stristr($this->sql_statement, 'INSERT'))
				$eventLog = 'Record insertion';
			if (stristr($this->sql_statement, 'DELETE'))
				$eventLog = 'Record deletion';
			if (stristr($this->sql_statement, 'UPDATE'))
				$eventLog = 'Record update';
			if (stristr($this->sql_statement, 'ALTER'))
				$eventLog = 'Table alteration';
			if (stristr($this->sql_statement, 'LOAD'))
				$eventLog = 'Record load';
			/**
			 * Using the same, internal functions.
			 */
			$data['log_date'] = Time::getLocalTime('Y-m-d H:i:s');
			$data['log_event'] = $eventLog;
//			$data['comments'] = $this->sql_statement;
			$data['comments'] = str_replace(",", " ", str_replace("'", "", $this->sql_statement));
			$data['log_user'] = $_SESSION['user']['name'];
			$data['checksum'] = crc32($this->sql_statement);
			$data['ip'] = $_SESSION['server']['REMOTE_ADDR'];
			$sqlStatement = $this->sqlBind($data, 'log', 'I');
			$this->setSQL($sqlStatement);
			$this->execOnly(false);

		}
		return $this->conn->errorInfo();
	}

    /**
     * @brief       Execute Log.
     * @details     This method is used to INSERT, UPDATE, DELETE, and ALTER the
     * database.
     *              with a event log injection.
     *
     * @author      Gino Rivera (Certun) <grivera@certun.com>
     * @version     Vega 1.0
     *
     * @note        The Log Injection is automatic It tries to detect an insert,
     * delete, alter and log the event
     *
     * @see         User::addUser() for Add example.
     *
     * @return      array Connection error info if any
     */
	public function dbupdateLog($Table, $Fields = null, $Where = null)
    {
        /**
         * Execute the sql statement
         */
        $this->conn->update($Table, $Fields, $Where);
        $eventLog = 'Record update';
        /**
         * Using the same, internal functions.
         */
        $data['log_date'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['log_event'] = $eventLog;
        $data['comments'] = $Table . ' - ' . $Fields . ' - ' . $Where;
        $data['log_user'] = $_SESSION['user']['name'];
        $data['checksum'] = crc32($this->sql_statement);
        $data['ip'] = $_SESSION['server']['REMOTE_ADDR'];
        $sqlStatement = $this->sqlBind($data, 'log', 'I');
        $this->setSQL($sqlStatement);
        $this->execOnly(false);

        return $this->conn->errorInfo();
    }
	/**
	 * @brief       Execute Event
	 * @details     This method is used to Inject directly to the event log
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @param       string $eventLog event data to log
	 * @return      array Connection error info if any
	 */
	function execEvent($eventLog)
	{
		$data['date'] = Time::getLocalTime('Y-m-d H:i:s');
		$data['event'] = $eventLog;
//		$data['comments'] = $this->sql_statement;
//		$data['comments'] = 'TODO';
		$data['comments'] = str_replace(",", " ", str_replace("'", "", $this->sql_statement));
		$data['user'] = $_SESSION['user']['name'];
		$sqlStatement = $this->sqlBind($data, 'log', 'I');
		$this->setSQL($sqlStatement);
		$this->fetchRecords();
		return $this->conn->errorInfo();
	}

	/**
	 * @brief       Fetch
	 * @details     This method is used to fetch only one record from the database
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @return      array of record or error if any
	 */
	function fetchRecord()
	{
		// Get all the records
		$recordSet = $this->conn->query($this->sql_statement);
		$err = $this->conn->errorInfo();
		if (!$err[2])
		{
			return $recordSet->fetch(PDO::FETCH_ASSOC);
		}
		else
		{
			return $err;
		}

	}

	/**
	 * @brief       Execute Statement.
	 * @details     This method is a simple SQL Statement, with no Event LOG
	 * injection
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @see         Logs::getLogs() for basic example and
	 * Patient::patientLiveSearch() for advance example.
	 *
	 * @param       int default to (PDO::FETCH_BOTH) Please see Fetch
	 *                  Style docs at <a
	 * href="http://php.net/manual/en/pdostatement.fetch.php">PDO Statement Fetch</a>
	 * @return      array of records, if error occurred return the error instead
	 */
	public function fetchRecords($fetchStyle = PDO::FETCH_ASSOC)
	{
		$recordSet = $this->conn->query($this->sql_statement);
		if (stristr($this->sql_statement, 'SELECT'))
		{
//			$this->lastInsertId = $this->conn->lastInsertId();
		}
		$err = $this->conn->errorInfo();
		if (!$err[2])
		{
			return $recordSet->fetchAll($fetchStyle);
		}
		else
		{
			return $err;
		}
	}

	/**
	 * @brief       Fetch the last error.
	 * @details     If there was a problem with the connection it will return
	 *              the error message, if the was not a connection problem, it will
	 *              return a array with the code and message.
	 *
	 * @author      Gino Rivera (Certun) <grivera@certun.com>
	 * @version     Vega 1.0
	 *
	 * @return      array|string
	 */
	function getError()
	{
		if (!$this->err)
		{
			return $this->conn->errorInfo();
		}
		else
		{
			return $this->err;
		}
	}

	/**
	 * @brief       Row Count
	 * @details     This methods is used to query an statement and return the rows
	 * coount using PDO
	 *
	 * @author      Ernesto J. Rodriguez (Certun) <erodriguez@certun.com>
	 * @version     Vega 1.0
	 *
	 * @note        count($sql) should be use instead of this method.
	 *              please refer to @ref Logs::getLogs() to see an example
	 *              of how to use count();
	 *
	 * @return      int The number of rows in a table
	 */
	function rowCount()
	{
		$recordSet = $this->conn->query($this->sql_statement);
		return $recordSet->rowCount();
	}

	/**
	 * dbHelper MicroORM
	 * -----------------
	 * This new set of method inside the dbHelper will help the exchange of
	 * data between the database and the software, witch means that the developer
	 * will have to mess with the database anymore.
	 */
	public function setDatabase(string $database)
	{
		$workingDatabase = $database;
	}

	public function setField(string $fieldName, string $fieldProperties)
	{
		$workingFields[] = array(
			$fieldName,
			$fieldProperties
		);
	}

	public function setTable(string $tableName)
	{
		$workingTable = $tableName;
	}

    public function AddToLog($msg){
        $this->_custom_log = "";
        $this->_custom_log .= $msg."\r\n";
        return $this->_custom_log;
    }
    
    public function SaveLog(){
      
      $contents  = "==============================";
      $contents .= date("Y-m-d h:i:s a")."\r\n";
      $contents .= $this ->_custom_log;
      $w = 0;
      // update file
      for ($r=0;$r<=60;$w++){ // Try 60 times to get write access to the file
        if ($r > 0) sleep(1); // if NOT the first attempt, sleep 1 second
        $fp = @fopen($_SESSION['root'] . "/log.txt","a+");
        if ($fp) break; // Got access, break loop
      }
      if ($fp){ // If access to the file was gained
        fputs($fp,$contents); // Inject contents
        fclose($fp); // Close file
      }

      return $contents;
    }

    public function CorrectStringDateField($FieldValue)
    {
        if (isset($FieldValue) and is_string($FieldValue)) {
            $hasil = substr($FieldValue,0,10);
        } else $hasil = null;
        return $hasil;
    }

    public function Date_Converter($date) {

        # Exception
        if (!is_null($date))
        {
            $date = new DateTime($date, new DateTimeZone($_SESSION['site']['timezone']));
            $strdate = $date->format('Y-m-d H:i:s');

            # Separate Date from Time
            $strdate = explode(" ", $strdate);

            $date = $strdate[0];

        }

        return $date;

    } # End Function
    public function DateTime_Converter($date) {

        # Exception
        if (!is_null($date))
        {
            $date = new DateTime($date, new DateTimeZone($_SESSION['site']['timezone']));
            $strdate = $date->format('Y-m-d H:i:s');

        }

        return $strdate;

    } # End Function
}
