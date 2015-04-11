<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Home Page</title>
    <!-- official libs -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
     <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine">
    <!-- user libs -->
    <link rel="stylesheet" href="home_page/home.css" />
    <link rel="stylesheet" href="home_page/navbar.css" />
    <link rel="stylesheet" href="home_page/logo.css" />
      
  

</head>

<body>

    <div class="pad container">

        <form id="form1" runat="server">

            <div id="cssmenu">


                <ul class="master_navigation nav">
                    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                    <li><a href="statistics/" target="_blank">Statistics</a></li>
                    <li><a href="source/" target="_blank">Source</a></li>
                    <li><a href="search/" target="_blank">Search</a></li>
                    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                    <li><a href="textview/" target="_blank">TextView</a></li>
                    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                </ul>
            </div>

            <hr />

            <!-- Big logos -->
            <div>
                <ul class="img-list">
                    <li>
                        <a href="#">
                            <img class="logo" src="images/img_home_page/document.png" />
                            <span class="text-content"><span>Document</span></span>
                        </a>
                    </li>  
                    <li>
                        <a href="project/" target="_blank">
                            <img class="logo" src="images/img_home_page/project.png" />
                            <span class="text-content"><span>Project</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="story/index.htm?../experiments/story.txt" target="_blank">
                            <img class="logo" src="images/img_home_page/experiment.png" />
                            <span class="text-content"><span>Experiment</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/songchitara/CS5610WebApp" target="_blank">
                            <img class="logo" src="images/img_home_page/github.png" />
                            <span class="text-content"><span>Github</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="blog/" target="_blank">
                            <img class="logo" src="images/img_home_page/blog_icon.png" />
                            <span class="text-content"><span>Blog</span></span>
                        </a>
                    </li>
                    
                </ul>
            </div>



                <hr />

              
                 <div id="description">
                    <p>
                        Hi, my name is Chi Song, a graduate student in Computer Science. This is my home 
                        page of course CS5610 Web Development. Learing web technolgies is a very exciting thing and I'm really enjoying exploring 
                        the web world! 
                    </p>
                </div>   

                <div class="to_center">
                        <img id="my_photo" src="images/chi.jpg" />
                </div>

                <hr />
            
            

        </form>

    </div>

</body>
</html>
