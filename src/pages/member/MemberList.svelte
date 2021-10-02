<script>
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import DotBlue from '../../components/member/DotBlue.svelte'
    import DotRed from '../../components/member/DotRed.svelte'
    const titleName = '회원 조회';
</script>
<ContentTitle {titleName}/>

<table>
    <thead>
        <th>No</th>
        <th>이름</th>
        <th>성별</th>
        <th>생년월일</th>
        <th>연락처</th>
        <th>학교</th>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td> 김철수</td>
            <td><DotBlue/>남</td>
            <td>2010-12-11</td>
            <td>010-1234-1234</td>
            <td>공릉초</td>
        </tr>
        <tr>
            <td>2</td>
            <td>김영희</td>
            <td><DotRed/>여</td>
            <td>2010-12-11</td>
            <td>010-1234-1234</td>
            <td>공릉초</td>
        </tr>
    </tbody>
</table>

<style>
    table{
        width: 100%;
        border-collapse: separate;
        font-size: 15px;
        border-spacing: 0 5px;
    }
    th{
        height: 25px;
        background-color: #ffea71;
        
    }
    td{
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        text-align: center;
        padding: 8px 0;
    }
    tr td:nth-child(1){
        border-left: 1px solid #e2e2e2;
    }
    tr td:last-child{
        border-right: 1px solid #e2e2e2;
    }
    
</style>